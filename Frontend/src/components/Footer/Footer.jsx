import React from 'react'
import style from './footer.module.css'
import { assets } from '../../assets/assets';
const Footer = () => {
  return (
    <div className={style.Footer} id="Footer">
      <div className={style.FooterContent}>
        <div className={style.FooterContentLeft}>
            <img src={assets.logo} alt=""  className={style.logo}/>
            <p>Fresh, delicious food delivered to your door. Order your favourite meals from the best restaurants and enjoy fast, reliable delivery every time.</p>
            <div className={style.FooterSocial}>
                <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className={style.FooterContentMiddle}>
            <h2>
                COMPANY
            </h2>
            <ul>
                <li>home</li>
                <li>about</li>
                <li>deilvery</li>
                <li>privacy policy</li>
            </ul>
        </div>
        <div className={style.FooterContentRight}>
            <h2>Get In Touch</h2>
            <ul>
                <li>+91 8573803669</li>
                <li>foodfinity@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className={style.FooterCopyrigth}>
        CopyRight 2026 ©️ Company.com - All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer