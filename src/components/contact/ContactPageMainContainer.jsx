import React from 'react'
// Components 
import ContactForm from '../forms/ContactForm'

function ContactPageMainContainer() {
  return (
    <main role="main" className="grid w-full h-full overflow-hidden">
    <div className="grid lg:grid-cols-[1fr_2fr] w-full h-full justify-center items-center p-2 overflow-hidden">
      {/* Header */}
      <header className="grid px-6 text-center lg:px-10">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Contact Us
        </h1>
      </header>
      {/* Contact component */}
      <div className="grid pr-10">
        <section className="grid border-[1px] border-border-main border-solid rounded-xl shadow-2xl bg-white">
          <div className="grid gap-4 w-full h-full px-8 py-6">
            {/* Contact form */}
            <section>
              <ContactForm />
            </section>
          </div>
        </section>
      </div>
    </div>
  </main>
  )
}

export default ContactPageMainContainer