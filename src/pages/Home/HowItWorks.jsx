import { Card, CardContent } from "../../components/ui/card";
import { motion } from "framer-motion";
import { Search, Car, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse Cars",
    description: "Use filters to find the perfect car at your location.",
  },
  {
    icon: Car,
    title: "Choose & Book",
    description: "Select a car, pick dates, and confirm your booking securely.",
  },
  {
    icon: CheckCircle2,
    title: "Drive & Enjoy",
    description: "Pick up the car and start your journey with confidence.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Renting a car has never been this simple.
        </motion.p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.25, duration: 0.5 }}
              >
                <Card className="p-6 shadow-sm hover:shadow-lg transition border border-border">
                  <CardContent className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-3 rounded-full bg-primary/10"
                    >
                      <Icon
                        className="h-8 w-8 text-primary"
                        aria-hidden="true"
                      />
                    </motion.div>
                    <h3 className="mt-4 text-xl font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
