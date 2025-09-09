import Link from 'next/link';
import { Metadata } from 'next';
import { PrintButton } from '../../components/PrintButton';
import './print.css';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de notre application',
};

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with table of contents */}
        <aside className="md:w-1/4 no-print">
          <div className="sticky top-4 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Sommaire</h2>
            <nav>
              <ul className="space-y-2">
                <li><a href="#responsable" className="text-blue-600 hover:underline">Responsable du traitement</a></li>
                <li><a href="#donnees" className="text-blue-600 hover:underline">Données collectées</a></li>
                <li><a href="#finalites" className="text-blue-600 hover:underline">Finalités du traitement</a></li>
                <li><a href="#durees" className="text-blue-600 hover:underline">Durées de conservation</a></li>
                <li><a href="#droits" className="text-blue-600 hover:underline">Vos droits</a></li>
                <li><a href="#cookies" className="text-blue-600 hover:underline">Cookies</a></li>
              </ul>
            </nav>
            <div className="mt-6">
              <PrintButton />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="md:w-3/4 print:w-full">
          <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
          
          <section id="responsable" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Responsable du traitement</h2>
            <p className="mb-4">
              Les données personnelles collectées sont traitées par [Nom de l'entreprise/entité], 
              [forme juridique] au capital de [montant] €, immatriculée au RCS de [ville] sous le numéro [numéro RCS], 
              dont le siège social est situé [adresse complète].
            </p>
          </section>

          <section id="donnees" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Données collectées</h2>
            <p className="mb-4">
              Nous collectons les données suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Données d'identification (nom, prénom, email)</li>
              <li>Données de connexion (adresse IP, logs)</li>
              <li>Données de navigation (cookies, pages consultées)</li>
              <li>Données de profil (préférences, centres d'intérêt)</li>
            </ul>
          </section>

          <section id="finalites" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Finalités du traitement</h2>
            <p className="mb-4">
              Vos données sont traitées pour les finalités suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Exécution des services demandés</li>
              <li>Amélioration de notre site et services</li>
              <li>Communication relative à votre compte</li>
              <li>Respect de nos obligations légales</li>
            </ul>
          </section>

          <section id="durees" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Durées de conservation</h2>
            <p className="mb-4">
              Vos données sont conservées pour la durée nécessaire à l'accomplissement des finalités pour lesquelles elles ont été collectées, conformément aux prescriptions légales.
            </p>
          </section>

          <section id="droits" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Vos droits</h2>
            <p className="mb-4">
              Conformément à la réglementation sur la protection des données, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Droit d'accès et de rectification</li>
              <li>Droit à l'effacement</li>
              <li>Droit à la limitation du traitement</li>
              <li>Droit à la portabilité des données</li>
              <li>Droit d'opposition</li>
            </ul>
            <p>
              Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : [adresse email de contact]
            </p>
          </section>

          <section id="cookies" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
            <p className="mb-4">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos préférences en matière de cookies via les paramètres de votre navigateur.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
