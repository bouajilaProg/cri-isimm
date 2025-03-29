import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection() {
  return (
    <section className="bg-muted py-16">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-lg font-medium">
                Do I need to know robotics to join the club?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                No, you just need to be motivated to learn! The CRI Club is open to everyone, whether you're a beginner or have some experience. Our community is supportive, and you'll find plenty of opportunities to learn and grow alongside other passionate members.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-lg font-medium">
                What if I don't have money to buy materials?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                If you're worried about costs, we have a Cool Guy called "RT" that allows you to borrow materials for learning and projects. This way, you can focus on your education without financial stress.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-lg font-medium">
                What will I gain by joining this club?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                By joining the CRI Club, you will connect with like-minded people, learn through our training sessions, and participate in exciting projects. It's a great way to improve your skills while having fun!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  )
}
