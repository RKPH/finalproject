import EmailIcon from '@mui/icons-material/Email';
import './footer.css';

function Footer() {
  return (
    <footer className="bg-[#1D2128] h-48 w-full flex flex-col justify-between items-center text-white text-sm">
      <div name="Upper" className="flex justify-between w-5/6 mt-12">
        {/* Logo */}
        <div name="logo" className="flex gap-2 w-1/6 relative">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0EGHJ3wzyOr1qi4SfKmC2wQC6Y-A7J1LgME2nD_JaGg&s" className="w-[48px] h-[42px]" alt="Logo" />
          <h3 className="text-2xl">ITEC</h3>
        </div>
        {/* Website Guides */}
        <div name="upper-content" className="flex gap-20 text-lg text-justify">
          <div className='flex flex-col'>
            <h1 className="font-bold">Product</h1>
            <a href='/features'>Feature</a>
            <a href='/pricing'>Pricing</a>
          </div>
          <div className='flex flex-col'>
            <h1 className="font-bold">Resource</h1>
            <a href='/blog'>Blog</a>
            <a href='/guides'>User guides</a>
            <a href='/webinars'>Webinars</a>
          </div>
          <div className='flex flex-col'>
            <h1 className="font-bold">Company</h1>
            <a href='/about'>About</a>
            <a href='/join'>Join us</a>
          </div>
        </div>
        {/* Mail */}
        <div name="subscription" className="flex flex-col gap-2 w-2/5 ml-10 pl-5 text-justify">
          <div name="subscription-text" className="flex flex-col justify-start">
            <h1 className="text-indigo-500 text-xl font-normal font-['Bitter'] leading-[30px]">Subscribe to our newsletter</h1>
            <h3 className="text-white text-xs font-normal font-['Raleway'] leading-tight">For product announcements and exclusive insights</h3>
          </div>
          <div name="email" className="flex flex-row">
              <input type = "email" id="email" className="text-neutral-300 text-sm font-normal font-['Raleway'] leading-snug bg-zinc-700 git" placeholder='Input your email'/>                        
              <button name="subcrible" className="w-[114px] h-9 px-[24.50px] py-[7px] bg-indigo-500 rounded-tr-xl rounded-br-xl justify-center items-center inline-flex text-white text-sm font-normal font-['Raleway'] leading-snug">Subscribe</button>
            
          </div>
        </div>
      </div>
      
      <div name="Lower" className="m-5 flex justify-between w-5/6"> 
        <select className="w-[127px] h-[35px] pl-3 pr-[11px] pt-[7px] pb-1.5 bg-zinc-700 rounded-xl justify-center items-center gap-10 inline-flex">
            <option value="english" className="text-gray-400 text-sm font-normal font-['Raleway'] leading-snug">English</option>
            <option value="english" className="text-gray-400 text-sm font-normal font-['Raleway'] leading-snug">Spanis</option>
        </select>
        {/*  */}
        <div name="lower-content" className="flex gap-7">
            <h3 className="text-gray-400 text-sm font-normal font-['Raleway'] leading-snug">© 2022 Brand, Inc.</h3>
            <ul className="flex gap-6 list-disc text-gray-400 text-sm font-normal font-['Raleway'] leading-snug">
                <li><a href=''>Privacy</a></li>
                <li><a href=''>Term</a></li>
                <li><a href=''>Site map</a></li>
            </ul>
        </div>
        {/* Social Media Icons */}
        <div name="social-icons">
          <ul className="flex gap-2">
          <li>
                <a href=''>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYBIrgiE10HsVt-49R1JjHsZ084dLUEym7ZkDHZVPHnw&s" className="w-[30px]" alt="Logo" />
                </a>
            </li>
            <li>
                <a href=''>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYkXop3DnIHWtkOQKo45lkF2eAg-eE4zMK-_c5MVp5A&s" className="w-[30px]" alt="Logo" />
                </a>
            </li>
            <li>
                <a href=''>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/2048px-LinkedIn_icon.svg.png" className="w-[30px]" alt="Logo" />
                </a>
            </li>
            <li>
                <a href=''>
                <img src="https://t3.ftcdn.net/jpg/04/74/05/94/360_F_474059464_qldYuzxaUWEwNTtYBJ44VN89ARuFktHW.jpg" className="w-[30px] h-[30px]" alt="Logo" />
                </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
