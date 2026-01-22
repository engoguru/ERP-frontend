import React from 'react'
import { CheckCircle, Shield, User, AlertTriangle, RefreshCcw, Mail } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

function TermCondition() {
  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-4xl pt-25">
        <h1 className="text-3xl font-bold mb-8">Terms & Conditions</h1>

        {/* Acceptance */}
        <div className="flex gap-4 mb-6 text-start">
          <CheckCircle className=" mt-1 text-[hsl(168_76%_42%)]" />
          <div>
            <h2 className="text-xl font-semibold">Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using this website, you agree to comply with these Terms and
              Conditions. If you do not agree, please do not use our services.
            </p>
          </div>
        </div>

        {/* Website Use */}
        <div className="flex gap-4 mb-6 text-start">
          <Shield className=" mt-1 text-[hsl(168_76%_42%)]" />
          <div>
            <h2 className="text-xl font-semibold">Use of the Website</h2>
            <p className="text-gray-700">
              You agree to use this website only for lawful purposes and not to
              violate the rights of others.
            </p>
          </div>
        </div>

        {/* User Accounts */}
        <div className="flex gap-4 mb-6 text-start">
          <User className=" mt-1 text-[hsl(168_76%_42%)]" />
          <div>
            <h2 className="text-xl font-semibold">User Accounts</h2>
            <p className="text-gray-700">
              You are responsible for maintaining the confidentiality of your
              account and all activities under it.
            </p>
          </div>
        </div>

        {/* Liability */}
        <div className="flex gap-4 mb-6 text-start">
          <AlertTriangle className=" mt-1 text-[hsl(168_76%_42%)]" />
          <div>
            <h2 className="text-xl font-semibold">Limitation of Liability</h2>
            <p className="text-gray-700">
              We are not responsible for any damages arising from the use of our
              website or services.
            </p>
          </div>
        </div>

        {/* Changes */}
        <div className="flex gap-4 mb-6 text-start">
          <RefreshCcw className=" mt-1 text-[hsl(168_76%_42%)]" />
          <div>
            <h2 className="text-xl font-semibold">Changes to Terms</h2>
            <p className="text-gray-700">
              We may update these Terms and Conditions at any time without prior
              notice.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex gap-4 text-start">
          <Mail className=" mt-1 text-[hsl(168_76%_42%)]" />
          <div>
            <h2 className="text-xl font-semibold">Contact Us</h2>
            <p className="text-gray-700">
              If you have questions, contact us at
              <strong> support@yourcompany.com</strong>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default TermCondition
