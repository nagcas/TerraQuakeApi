import { TimelineContent } from "@/components/testimonials/timeline-animation";
import { useRef } from "react";

export default function ClientFeedback() {
    const testimonialRef = useRef(null);
  
    const revealVariants = {
      visible: (i) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: i * 0.4,
          duration: 0.5,
        },
      }),
      hidden: {
        filter: "blur(10px)",
        y: -20,
        opacity: 0,
      },
    };
  
  return (
    <main className="w-ful h-screen mt-4">
      <section className="max-w-screen relative h-screen container text-white  rounded-lg  py-14" ref={testimonialRef}>
        <article className={"max-w-screen-md mx-auto text-center space-y-2 "} >
          <TimelineContent as="h1" className={"xl:text-4xl text-3xl  font-medium  bg-gradient-to-r from-[#C137D0] to-[#F035A1] bg-clip-text text-transparent pb-2"} animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef}>
            Trusted by Researchers, Developers & Disaster-Response Teams
          </TimelineContent>
          <TimelineContent as="p" className={"mx-auto text-gray-400"} animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef}>
            Hear how the TerraQuake API empowers scientists, developers, and
        organizations with real-time earthquake insights.
          </TimelineContent>
        </article>
        <div className="lg:grid lg:grid-cols-3  gap-2 flex flex-col w-full lg:py-10 pt-10 pb-4 lg:px-10 px-4">
          <div className="md:flex lg:flex-col lg:space-y-2 h-full lg:gap-0 gap-2 ">
            <TimelineContent animationNum={0} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-200 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto">
                <p>
                  "TerraQuake has transformed how our research team tracks seismic
              activity. The real-time API has made our monitoring process faster
              and more reliable."
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-sm text-gray-100">
                       Dr. Elena Ruiz
                    </h2>
                    <p className="text-gray-400">Seismologist, Global Quake Institute</p>
                  </div>
                  <img
                    src="https://avatar.iran.liara.run/public/15"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={1} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[3] flex-[4] lg:h-fit  lg:shrink-0 flex flex-col justify-between relative bg-[#172554] text-white overflow-hidden rounded-lg border border-blue-500/30 p-5">
              <article className="mt-auto">
                <p className="text-gray-300">
                 "We integrated TerraQuake API into our disaster-response system,
              and now alerts reach communities in seconds."
                </p>
                <div className="flex items-center justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl text-gray-100">Rajesh Kumar</h2>
                    <p className="text-gray-400">Director, EarthSafe Foundation</p>
                  </div>
                  <img
                    src="https://avatar.iran.liara.run/public/15"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="lg:h-full  md:flex lg:flex-col h-fit lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={2} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-zinc-900 text-white overflow-hidden rounded-lg border border-gray-800 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-gray-300">
                  "The visualization tools are game-changing — our team can now
              analyze global seismic trends interactively."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg text-gray-100">
                      Aiko Tanaka
                    </h2>
                    <p className="lg:text-base text-sm text-gray-400">Data Scientist, QuakeSense Labs</p>
                  </div>
                  <img
                    src="https://avatar.iran.liara.run/public/15"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={3} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-zinc-900 text-white overflow-hidden rounded-lg border border-gray-800 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-gray-300">
                   "As a developer, the API docs are some of the cleanest I’ve seen.
              Integration was seamless."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg text-gray-100">  Michael Lee </h2>
                    <p className="lg:text-base text-sm text-gray-400">  Full-Stack Engineer, QuakeAlert</p>
                  </div>
                  <img
                    src="https://avatar.iran.liara.run/public/15"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={4} customVariants={revealVariants} timelineRef={testimonialRef} className="flex flex-col justify-between relative bg-zinc-900 text-white overflow-hidden rounded-lg border border-gray-800 p-5">
              <article className="mt-auto">
                <p className="2xl:text-base text-sm text-gray-300">
                   "Having open-source access means we can contribute back. The
              community around TerraQuake is inspiring."
                </p>
                <div className="flex justify-between items-end pt-5">
                  <div>
                    <h2 className=" font-semibold lg:text-xl text-lg text-gray-100">
                      Anil Kumawat
                    </h2>
                    <p className="lg:text-base text-sm text-gray-400">Open Source Contributor</p>
                  </div>
                  <img
                    src="https://avatar.iran.liara.run/public/15"
                    alt="logo"
                    width={200}
                    height={200}
                    className="lg:w-16 lg:h-16 w-12 h-12 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
          <div className="h-full md:flex lg:flex-col lg:space-y-2 lg:gap-0 gap-2">
            <TimelineContent animationNum={5} customVariants={revealVariants} timelineRef={testimonialRef} className=" lg:flex-[3] flex-[4] flex flex-col justify-between relative bg-[#172554] text-white overflow-hidden rounded-lg border border-blue-500/30 p-5">
              <article className="mt-auto">
                <p className="text-gray-300">
                   "With TerraQuake’s advanced filtering, we built a dashboard that
              tracks only high-magnitude events in our region."
                </p>
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl text-gray-100">David Chen</h2>
                    <p className="text-gray-400">Geospatial Engineer</p>
                  </div>
                  <img
                    src="https://avatar.iran.liara.run/public/15"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
            <TimelineContent animationNum={6} customVariants={revealVariants} timelineRef={testimonialRef} className="lg:flex-[7] flex-[6] flex flex-col justify-between relative bg-primaryColor overflow-hidden rounded-lg border border-gray-200 p-5">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:50px_56px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
              <article className="mt-auto">
                <p className="text-gray-300">
                 "TerraQuake represents the future of seismic data sharing —
              transparent, real-time, and community-driven."
                </p >
                <div className="flex justify-between pt-5">
                  <div>
                    <h2 className=" font-semibold text-xl text-gray-100">Prof. Laura Becker</h2>
                    <p className="text-gray-400">Geophysics Dept, Stanford University</p>
                  </div>
                  <img
                    src="https://avatar.iran.liara.run/public/15"
                    alt="logo"
                    width={200}
                    height={200}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </main>
  );
}
