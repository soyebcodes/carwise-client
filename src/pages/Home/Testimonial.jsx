import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah K.",
    feedback:
      "The booking process was so easy and the car was in perfect condition. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "James L.",
    feedback:
      "Great selection of vehicles and amazing customer support. Will definitely rent again.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 3,
    name: "Emily R.",
    feedback:
      "Affordable prices and flexible rental options. Made my trip stress-free!",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Testimonials() {
  return (
    <section className="py-16 ">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold mb-6 text-sky-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>
        <motion.div
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {testimonials.map(({ id, name, feedback, avatar }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              className="p-6 rounded-lg shadow-md text-left"
            >
              <Quote className="text-sky-500 w-6 h-6 mb-3" />
              <p className="text-gray-700 italic mb-4 dark:text-white">
                &ldquo;{feedback}&rdquo;
              </p>
              <div className="flex items-center">
                <img
                  src={avatar}
                  alt={name}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
