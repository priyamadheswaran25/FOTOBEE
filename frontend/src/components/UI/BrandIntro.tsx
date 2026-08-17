import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function BrandIntro() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 bg-cream relative paper-texture overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 relative">
        {/* Left side: Typography / Content */}
        <div className="w-full md:w-[46%] relative z-10 flex flex-col text-left">
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className={`font-handwritten text-terracotta mb-6 select-none ${
              t('text-2xl md:text-3xl', 'text-xl font-tamil')
            }`}
          >
            {t('More than a photograph', 'ஒரு புகைப்படத்திற்கும் மேலாக')}
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className={`font-serif text-charcoal leading-[1.15] mb-8 font-normal tracking-wide max-w-xl ${
              t('text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px]', 'text-3xl sm:text-4xl lg:text-[42px] leading-[1.3] font-tamil')
            }`}
          >
            {t(
              'We capture moments, emotions, and the stories that define them.',
              'தருணங்களை மட்டும் பதிவு செய்வதில்லை; அவற்றுள் உறைந்திருக்கும் உணர்வுகளையும் காத்து வைக்கிறோம்.'
            )}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className={`text-mud/85 leading-relaxed max-w-md ${
              t('text-base sm:text-[17px]', 'text-sm sm:text-base font-tamil')
            }`}
          >
            {t(
              "At Footbee, we believe photography is an editorial experience. We don't just point a camera; we compose memories with intention, lighting, and an artistic eye.", 
              "ஒரு புகைப்படம் தருணத்தை மட்டும் காப்பதில்லை… அந்த தருணத்தில் நாம் உணர்ந்த காதலையும் காப்பாற்றுகிறது. கலையம்சத்துடனும் நுட்பத்துடனும் உங்கள் நினைவுகளை செதுக்குகிறோம்."
            )}
          </motion.p>
        </div>

        {/* Right side: Large portrait photography */}
        <div className="w-full md:w-[44%] relative z-10 mt-8 md:mt-0">
          <div className="aspect-[3/4] w-full overflow-hidden bg-charcoal relative shadow-[0_20px_50px_rgba(0,0,0,0.15)] group">
            {/* Shutter Masks */}
            <motion.div 
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute inset-0 bg-cream origin-left z-20 w-1/2"
            />
            <motion.div 
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="absolute inset-0 left-1/2 bg-cream origin-right z-20 w-1/2"
            />
            
            {/* Image */}
            <motion.img 
              initial={{ scale: 1.12, filter: 'blur(6px)' }}
              whileInView={{ scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              src="/images/photography/candid/images (1).jpg" 
              alt="Candid celebration moment" 
              className="w-full h-full object-cover pointer-events-none select-none"
            />
            
            {/* Light Sweep Effect */}
            <motion.div
               initial={{ x: '-100%', opacity: 0 }}
               whileInView={{ x: '100%', opacity: 0.25 }}
               transition={{ duration: 1.5, delay: 0.8, ease: "linear" }}
               viewport={{ once: true, margin: "-100px" }}
               className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-full h-full transform -skew-x-12 z-10 pointer-events-none"
            />
          </div>
          
          {/* Est. 2024 Floating Label */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="absolute -bottom-6 -left-6 bg-white px-5 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] z-30"
          >
            <p className="font-serif text-sm italic text-charcoal">Est. 2024</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
