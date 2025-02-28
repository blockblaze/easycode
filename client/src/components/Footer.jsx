import {Footer } from 'flowbite-react';
// import { Link } from 'react-router-dom';
import { BsInstagram, BsTwitter, BsGithub, BsYoutube } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className='border border-t-4 border-custom-orange'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>

          {/* <div className='mt-5'>
<form className="flex">
  <TextInput
    id="footer-email"
    placeholder="Email Address"
    className="flex-1 font-normal"
    style={{borderRadius:0}}
    required
    // Removes rounded corners and makes input take the available width
  />
    <button className="bg-custom-orange text-white p-2 m:p-3 hover:bg-custom-dark-orange font-medium text-sm">Subscribe</button>

</form>
          </div> */}

        </div>
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="EasyCode"
            year={new Date().getFullYear()}
          />
 
        </div>
      </div>
    </Footer>
  );
}