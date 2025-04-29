import * as React from 'react';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import SectionTitle from '../Common/SectionTitle';

interface ContactProps {
  id: string;
}

const Contact: React.FC<ContactProps> = ({ id }) => {
  const phoneNumber = "7200672127";
  const emailAddress = "ryzenate72@gmail.com";
  const location = "New York, USA";

  const IconWrapper: React.FC<{ icon: IconType }> = ({ icon: Icon }: { icon: IconType }) => (
    <span className="text-blue-400 text-2xl">
      <Icon />
    </span>
  );

  return (
    <section
      id={id}
      data-scroll-section
      className="relative flex flex-col justify-center items-center py-16 md:py-24 px-4 md:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/projects/bg1.webp')` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <SectionTitle
          label="Contact"
          title="Contact"
          paragraph="Let's create something extraordinary together. Reach out and let's start your project."
          center
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-4 p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              className="p-3 rounded-full bg-blue-500/20"
            >
              <IconWrapper icon={FaPhoneAlt} />
            </motion.div>
            <span className="text-white font-semibold text-lg">{phoneNumber}</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-4 p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              className="p-3 rounded-full bg-blue-500/20"
            >
              <IconWrapper icon={FaEnvelope} />
            </motion.div>
            <span className="text-white font-semibold text-lg">{emailAddress}</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-4 p-6 backdrop-blur-md bg-white/10 border border-white/20 rounded-lg"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              className="p-3 rounded-full bg-blue-500/20"
            >
              <IconWrapper icon={FaMapMarkerAlt} />
            </motion.div>
            <span className="text-white font-semibold text-lg">{location}</span>
          </motion.div>
        </div>

        <motion.form 
          className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-8">
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4">
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-transparent text-white placeholder:text-white/50 focus:outline-none"
              />
            </div>
          </div>
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg p-4 h-full">
            <textarea
              placeholder="Your Message"
              className="w-full h-full bg-transparent text-white placeholder:text-white/50 focus:outline-none resize-none"
              rows={6}
            />
          </div>
        </motion.form>

        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Send Message
          </motion.button>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      <motion.div 
        className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 10 }}
      />
    </section>
  );
};

export default Contact;
