import { Car, DollarSign, CalendarClock, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Car className="text-sky-600 w-8 h-8" />,
    title: "Wide Variety of Cars",
    desc: "Choose from economy to luxury vehicles tailored to your needs.",
  },
  {
    icon: <DollarSign className="text-sky-600 w-8 h-8" />,
    title: "Affordable Prices",
    desc: "Get competitive daily rates with no hidden charges.",
  },
  {
    icon: <CalendarClock className="text-sky-600 w-8 h-8" />,
    title: "Easy Booking Process",
    desc: "Reserve your ride in just a few clicks with live availability.",
  },
  {
    icon: <Headphones className="text-sky-600 w-8 h-8" />,
    title: "24/7 Customer Support",
    desc: "Our team is always here to help with any concerns.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-muted">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-sky-700">
          Why Choose Us?
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 text-center"
              variants={cardVariants}
            >
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
