import React from 'react'
import FooterSocialCTA from './FooterSocialCTA'

function FooterComponent() {
  return (
    <footer className='grid bg-alt-background w-full overflow-hidden absolute bottom-0 h-20'>
        <div>
            <section>Footer</section>
            <FooterSocialCTA />
        </div>
    </footer>
  )
}

export default FooterComponent