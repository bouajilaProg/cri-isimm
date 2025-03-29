export default function IntroductionSection() {
  return (
    <section className="bg-background py-16">
      <div className="container px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">What do we do</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-card p-6 shadow-md">
            <h3 className="mb-3 text-xl font-semibold">CRI family</h3>
            <p className="text-muted-foreground">
              CRI est plus qu’un simple club, c’est une véritable famille où chaque membre se soutient mutuellement. Ensemble, nous apprenons, créons et grandissons dans un environnement amical et collaboratif. Peu importe vos compétences, vous trouverez ici un espace où vous serez accueilli et encouragé à atteindre vos objectifs.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-md">
            <h3 className="mb-3 text-xl font-semibold">Formation</h3>
            <p className="text-muted-foreground">
              Chez CRI, l’apprentissage est au cœur de nos activités. Nous proposons des formations variées sur la robotique, l’électronique, et le développement, adaptées aux débutants comme aux plus avancés. Notre objectif est de vous donner les compétences nécessaires pour transformer vos idées en projets concrets.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-md">
            <h3 className="mb-3 text-xl font-semibold">Competition</h3>
            <p className="text-muted-foreground">
              CRI participe activement à des compétitions nationales et internationales, mettant au défi les membres de repousser leurs limites. C’est l’opportunité parfaite pour appliquer vos connaissances, collaborer en équipe, et représenter fièrement notre club tout en développant vos compétences dans des environnements compétitifs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

