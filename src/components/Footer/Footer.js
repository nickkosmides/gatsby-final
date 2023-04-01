import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';


export const Footer = ({ children }) => {
  return <div className="bg-gray-custom  border-t-8">
    <div className="container mx-auto px-4   py-10 ">
      <div className="flex flex-col items-center space-y-4">
      <div className="pixel  text-primary pb-10">Gamebit</div>
      <p className="font-bold text-4xl pb-4">Βρείτε μας</p>
      <div className="flex justify-center space-x-6">
    <FontAwesomeIcon className="text-3xl hover:text-primary cursor-pointer"  icon={faFacebook} />
    <FontAwesomeIcon className="text-3xl hover:text-primary cursor-pointer" icon={faInstagram} />
    <FontAwesomeIcon className="text-3xl hover:text-primary cursor-pointer" icon={faYoutube} />
    <FontAwesomeIcon className="text-3xl hover:text-primary cursor-pointer" icon={faTwitter} />
    </div>
    

    <div className="flex  font-bold space-x-2 pt-10">
      <div>Όροι Χρήσης & Πολιτική Απορρήτου</div>
      <div>|</div>
      <div>Επικοινωνία</div>
      <div>|</div>
      <div>Διαφημιστείτε</div>

    </div>
    
    <div className="text-sm text-gray-300 ">ⓒ Gamebit 2023</div>
    </div>
    </div>
  </div>;
}