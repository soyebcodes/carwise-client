import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { Search, Car, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: <Search className="h-8 w-8 text-blue-600" />,
    title: "Browse Cars",
    description: "Use filters to find the perfect car at your location.",
  },
  {
    icon: <Car className="h-8 w-8 text-blue-600" />,
    title: "Choose & Book",
    description: "Select a car, pick dates, and confirm your booking securely.",
  },
  {
    icon: <CheckCircle2 className="h-8 w-8 text-blue-600" />,
    title: "Drive & Enjoy",
    description: "Pick up the car and start your journey with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 ">
      <div className="max-w-6xl mx-auto px-4 text-center text-sky-700 ">
        <motion.h2
          className="text-3xl font-bold mb-4 "
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-10 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Renting a car has never been this simple.
        </motion.p>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3, duration: 0.5 }}
            >
              <Card className="p-6 shadow-sm hover:shadow-lg transition">
                <CardContent className="flex flex-col items-center text-center">
                  {step.icon}
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-500 mt-2 dark:text-white">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
