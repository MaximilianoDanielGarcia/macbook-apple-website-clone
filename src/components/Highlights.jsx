import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMediaQuery } from "react-responsive"

gsap.registerPlugin(ScrollTrigger)


const Highlights = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' })

  useGSAP(() => {
    gsap.to(['.left-column', '.right-column'], {
      scrollTrigger: {
        trigger: '#highlights',
        start: isMobile ? 'bottom bottom' : 'top center'
      },
      opacity: 1,
      y: 0,
      duration: 2,
      stagger: 0.5,
      ease: 'power1.inOut'
    })
  }, [])
  return (
    <section id="highlights">
      <h2>There's never been a better time to upgrade.</h2>
      <h3>Here's what you get with the new MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="Laptop" className="w-12 sm:w-auto"/>
            <p>Fly through demanding tasks up to 9.8x faster.</p>
          </div>
          <div>
            <img src="/sun.png" alt="Sun" className="w-12 sm:w-auto"/>
            <p>A stunning <br /> Liquid Retina XDR display.</p>
          </div>
        </div>
        <div className="right-column">
          <div className='apple-gradient'>
            <img src="/ai.png" alt="AI" className="w-12 sm:w-auto"/>
            <p>Built for <br />. <span>Apple Intelligence.</span></p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" className="w-12 sm:w-auto" />
            <p>Up to <span className='green-gradient'>{' '}14 more hours {' '}</span> battery life. <br /> <span className='text-dark-100'>{' '}(Up to 24 hours total.)</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Highlights