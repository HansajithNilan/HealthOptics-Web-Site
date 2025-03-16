import React from 'react'

import msg_icon from '../../../assets/msg-icon.png'
import mail_icon from '../../../assets/mail-icon.png'
import phone_icon from '../../../assets/phone-icon.png'
import location_icon from '../../../assets/location-icon.png'

import './contact.css'

function contact() {
  return (
    <div className='contact'>
      <div className="contact-col">
        <h3>Send Us a message <img src={msg_icon}alt="" /></h3>
        <p>A paragraph is defined as “a group of sentences or a single sentence that forms a unit” (Lunsford and Connors 116). Length and appearance do not determine whether a section in a paper is a paragraph. For instance, in some styles of writing, particularly journalistic styles, a paragraph can be just one sentence long.</p>
        <ul>
            <li>
                <img src={mail_icon} alt="" />
                healthoptics@gmail.com
            </li>
            <li>
            <img src={phone_icon} alt="" />
                +94 713 275308
            </li>
            <li>
            <img src={location_icon} alt="" />
                145/1 Kahanthota Road,Malabe
            </li>
        </ul>
      </div>
      <div className="contact-col">
        <form>
            <label>Your name</label>
            <input type='text' name='name' placeholder='Enter Your Name' required></input>
            <label>Phone Number</label>
            <input type='tel' name='phone' placeholder='Enter Your Mobile Number'></input>
            <label>Write Your Msg Hear</label>
            <textarea name='message'  rows='6' placeholder='Enter Your Msg' required></textarea>
            <button type='submit' className='sub-btn'>Submit Now </button>

        </form>
        <span>
            Sending
        </span>
        </div>
    </div>
  )
}

export default contact
