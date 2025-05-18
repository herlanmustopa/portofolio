import {albert_Sans, thesignature, unbounded} from "@/utils/font";
import Page from "../organisms/pages";
import Button from "../molecules/button";
import Image from "next/image";
import Personal from "../../public/img/react.png";
import Exclusive from "../../public/img/react.png";
import Best from "../../public/img/react.png";
import Discover from "../../public/img/react.png";
// import Separator from "../../../public/img/separator.svg";

export default function Expertice() {
  return (
    <div className='bg-primary' id='custome-trip'>
      <Page
        className=' flex flex-col items-center justify-center h-full text-white
      '>
        <div className='my-10 text-center'>
          <h1
            className={`text-7xl group:items-start text-green mb-4  ${thesignature.className}`}>
            Beyond Premium
          </h1>
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-black ${unbounded.className}`}>
            Elevate Your Experience
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8'>
            <div className='flex flex-col items-center justify-center'>
              <Image src={Personal} alt='Discover' width={100} height={100} />
              <div
                className={`uppercase text-green font-bold ${albert_Sans.className}`}>
                PERSONAL ITINERARIES
              </div>
              <h1 className={`text-md text-black ${albert_Sans.className}`}>
                Our premium travel services offer tailor-made itineraries
                crafted to suit your unique preferences and desires.
              </h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Image
                src={Exclusive}
                alt='EXCLUSIVE EXPERIENCES'
                width={100}
                height={100}
              />
              <div
                className={`uppercase text-green font-bold ${albert_Sans.className}`}>
                EXCLUSIVE EXPERIENCES
              </div>
              <h1 className={`text-md text-black ${albert_Sans.className}`}>
                From private charters to behind-the-scenes tours, we offer
                access to unique opportunities that are designed to elevate your
                trip to the next level.
              </h1>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <Image
                src={Best}
                alt='Best Facilities'
                width={100}
                height={100}
              />
              <div
                className={`uppercase text-green font-bold ${albert_Sans.className}`}>
                Best Facilities
              </div>
              <h1 className={`text-md text-black ${albert_Sans.className}`}>
                Experience the epitome of luxury with our premium facility,
                designed to provide an unparalleled level of comfort and
                indulgence.
              </h1>
            </div>
          </div>
        </div>
        <div className='my-10 text-center'>
          <div className='flex lg:flex-row sm:flex-col items-center justify-center'>
            <Image src={Discover} alt='Discover' width={302} height={302} />
            <div className='lg:w-3/5  md:w-3/5 sm:w-full xs:w-full items-start lg:text-start sm:text-center'>
              <p
                className={`uppercase text-green-80 font-bold text-2xl ${unbounded.className}`}>
                Discover Tailored Experiences
              </p>
              <h1 className={`text-md text-black ${albert_Sans.className}`}>
                Create your own journey, personalized to suit your preferences
                and interests, ensuring a once-in-a-lifetime adventure awaits.
              </h1>
              <Button
                text='Customize Your Trip'
                className={`${albert_Sans.className} my-10 bg-green-80 hover:bg-gold font-bold lg:w-64 xs:w-full`}
              />
            </div>
          </div>
          {/* <Image
            src={Separator}
            alt='Separator'
            height={400}
            className='mb-10'
          /> */}
        </div>
      </Page>
    </div>
  );
}
