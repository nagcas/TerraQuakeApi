// Funzione per creare animazione di stelle
export default function CreateStar() {
  const star = document.createElement('div')
  star.className = 'star'
  star.style.left = `${Math.random() * 100}vw`
  star.style.top = `${Math.random() * 100}vh`
  star.style.animationDuration = `${Math.random() * 10 + 1}s`
  document.body.appendChild(star)

  // Elimina la stella dopo l'animazione
  setTimeout(() => {
    star.remove()
  }, 1000)
}
