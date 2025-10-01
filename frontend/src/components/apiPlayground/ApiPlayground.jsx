import { useMemo, useState } from "react";
import { ImSpinner9 } from "react-icons/im";

export default function ApiPlayground({ title = "API Playground", endpoints = [], onResponse }) {
  const BACKEND_URL = import.meta.env.VITE_URL_BACKEND || "";

  const [activeKey, setActiveKey] = useState(endpoints[0]?.key || "");
  const active = useMemo(() => endpoints.find(e => e.key === activeKey) || endpoints[0], [activeKey, endpoints]);

  const initialValues = useMemo(() => {
    const values = {};
    (active?.params || []).forEach(p => {
      values[p.name] = p.defaultValue ?? "";
    });
    return values;
  }, [active]);

  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedKey, setCopiedKey] = useState("");
  const [langTab, setLangTab] = useState('javascript'); // 'shell' | 'javascript' | 'python'
  const [variantTab, setVariantTab] = useState('fetch'); // depends on lang

  // reset form when endpoint changes
  const onChangeActive = (key) => {
    setActiveKey(key);
    const next = endpoints.find(e => e.key === key);
    const nextValues = {};
    (next?.params || []).forEach(p => {
      nextValues[p.name] = p.defaultValue ?? "";
    });
    setValues(nextValues);
    setResponseData(null);
    setErrorMessage("");
  };

  const buildQueryString = (params) => {
    const usp = new URLSearchParams();
    (active?.params || []).forEach(p => {
      const v = params[p.name];
      if (v !== undefined && v !== null && String(v).length > 0) {
        usp.set(p.name, String(v));
      }
    });
    const qs = usp.toString();
    return qs ? `?${qs}` : "";
  };

  const buildUrl = () => {
    const qs = buildQueryString(values);
    return `${BACKEND_URL}${active.path}${qs}`;
  };

  const sendRequest = async () => {
    setLoading(true);
    setErrorMessage("");
    setResponseData(null);
    if (typeof onResponse === 'function') onResponse({ features: [] });
    try {
      const url = buildUrl();
      const res = await fetch(url, { method: active.method || "GET" });
      const text = await res.text();
      let data;
      try { data = JSON.parse(text); } catch { data = { raw: text }; }
      if (!res.ok) {
        setErrorMessage(`status: ${res.status} - message: ${data.message}` || `${res.status} - ${res.statusText}`);
      }
      setResponseData(data);
      if (typeof onResponse === 'function') {
        const features = Array.isArray(data?.data) ? data.data : [];
        onResponse({
          features,
          title: active?.label || active?.key || 'Results',
          method: active?.method || 'GET',
          path: active?.path || '',
          url,
          description: active?.description || ''
        });
      }
    } catch (err) {
      setErrorMessage("Request failed");
    } finally {
      setLoading(false);
    }
  };

  const sampleCurl = () => `curl -s -X ${active.method || "GET"} \"${buildUrl()}\"`;

  const sampleFetch = () => `fetch('${buildUrl()}', { method: '${active.method || "GET"}' })\n  .then(r => r.json())\n  .then(console.log)\n  .catch(console.error)`;

  const sampleAxios = () => {
    const base = `${BACKEND_URL}${active.path}`;
    const paramsObj = {};
    (active?.params || []).forEach(p => {
      const v = values[p.name];
      if (v !== undefined && v !== null && String(v).length > 0) paramsObj[p.name] = v;
    });
    const paramsJson = JSON.stringify(paramsObj, null, 2).replace(/\n/g, "\n");
    return `import axios from 'axios'\n\naxios.get('${base}', { params: ${paramsJson} })\n  .then(res => console.log(res.data))\n  .catch(console.error)`;
  };

  const samplePythonRequests = () => {
    const base = `${BACKEND_URL}${active.path}`;
    const paramsObj = {};
    (active?.params || []).forEach(p => {
      const v = values[p.name];
      if (v !== undefined && v !== null && String(v).length > 0) paramsObj[p.name] = v;
    });
    const paramsJson = JSON.stringify(paramsObj, null, 2)
      .replace(/"([^("]+)":/g, '$1:') // lighten look, though still valid after replacement below
      .replace(/\{/g, '{')
      .replace(/\}/g, '}');
    // Compose Python dict manually to ensure correct syntax
    const dict = Object.entries(paramsObj).length
      ? '{\n' + Object.entries(paramsObj).map(([k, v]) => `  '${k}': '${v}'`).join(',\n') + '\n}'
      : '{}';
    return `import requests\n\nurl = '${base}'\nparams = ${dict}\n\nresp = requests.get(url, params=params)\nprint(resp.json())`;
  };

  const currentSnippet = () => {
    if (langTab === 'shell') return sampleCurl();
    if (langTab === 'python') return samplePythonRequests();
    // javascript
    if (variantTab === 'axios') return sampleAxios();
    return sampleFetch();
  };

  const copyToClipboard = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(""), 1200);
    } catch {}
  };

  return (
    <section className="w-full text-white px-6 py-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">{title}</h2>
        {active?.description && (
          <p className="text-gray-400 text-base max-w-2xl mx-auto mt-2">{active.description}</p>
        )}
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {endpoints.map(ep => (
            <button
              key={ep.key}
              onClick={() => onChangeActive(ep.key)}
              className={`py-2 px-4 rounded-full font-semibold transition-colors ${activeKey === ep.key ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white cursor-pointer" : "bg-white/10 hover:bg-pink-500 text-white cursor-pointer"}`}
            >
              {ep.label}
            </button>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col gap-2 mb-4">
            <div className="text-purple-300 text-sm">{active.method} {active.path}</div>
            <div className="overflow-auto whitespace-pre text-sm text-gray-300">URL: {buildUrl()}</div>
          </div>

          {(active?.params?.length > 0) && (
            <div className="mb-6">
              <p className="text-white text-xl font-medium mb-3">Parameters</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {active.params.map(p => (
                  <div key={p.name} className="text-left">
                    <label className="block text-sm text-gray-300 mb-1">{p.label || p.name}{p.required ? <span className="text-pink-500"> *</span> : null}</label>
                    <input
                      className="w-full px-3 py-2 border border-white/10 bg-black/20 rounded-2xl text-white focus:border-purple-600 focus:outline-none"
                      value={values[p.name] ?? ""}
                      onChange={(e) => setValues(v => ({ ...v, [p.name]: e.target.value }))}
                      placeholder={p.placeholder || ""}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <button
              onClick={sendRequest}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transform transition duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer"
            >
              Send request
            </button>
          </div>

          {loading && (
            <p className="text-yellow-400 mb-4 flex items-center gap-2"><ImSpinner9 className="spinner" /> Loading...</p>
          )}

          {errorMessage && (
            <div className="bg-red-900/40 border border-red-700/40 rounded-lg p-3 text-sm text-red-200 mb-4">{errorMessage}</div>
          )}

          {responseData && (
            <div className="bg-black/40 rounded-lg p-4 text-sm text-yellow-400 max-h-[400px] overflow-auto">
              <pre className="text-left font-mono break-words">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          )}

          <div className="bg-black/30 border border-white/10 rounded-xl p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {['shell','javascript','python'].map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      setLangTab(l);
                      setVariantTab(l === 'javascript' ? 'fetch' : (l === 'shell' ? 'curl' : 'requests'));
                    }}
                    className={`text-md py-1 px-3 rounded-full ${langTab === l ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-white/10 hover:bg-white/20'} cursor-pointer`}
                  >{l}</button>
                ))}
              </div>

              {langTab === 'javascript' && (
                <div className="flex flex-wrap items-center gap-2">
                  {['fetch','axios'].map(v => (
                    <button
                      key={v}
                      onClick={() => setVariantTab(v)}
                      className={`text-md py-1 px-3 rounded-full ${variantTab === v ? 'bg-pink-500' : 'bg-white/10 hover:bg-white/20'} cursor-pointer`}
                    >{v}</button>
                  ))}
                </div>
              )}

              {langTab === 'shell' && (
                <div className="flex items-center gap-2">
                  <span className="text-md bg-pink-500 py-1 px-3 rounded-full">curl</span>
                </div>
              )}

              {langTab === 'python' && (
                <div className="flex items-center gap-2">
                  <span className="text-md bg-pink-500 py-1 px-3 rounded-full">requests</span>
                </div>
              )}

              <div className="flex items-center justify-between mt-2">
                <p className="text-white font-medium text-sm">Code Sample</p>
                <button onClick={() => copyToClipboard('code', currentSnippet())} className="text-md bg-white/10 hover:bg-white/20 px-2 py-1 rounded cursor-pointer">
                  {copiedKey === 'code' ? 'Copied' : 'Copy'}
                </button>
              </div>

              <pre className="text-left font-mono text-green-400 text-sm overflow-auto break-words p-3 bg-black/60 rounded-lg">
                {currentSnippet()}
              </pre>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


