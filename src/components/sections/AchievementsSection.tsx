import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Medal, Trophy, Shield, Star } from 'lucide-react';
import PDFViewerModal from '@/components/PDFViewerModal';

// Import certification logos
import associateJavaLogo from '@/assets/certs/associate-java.png';
import associateLogo from '@/assets/certs/associate.png';
import foundationsLogo from '@/assets/certs/foundations.jpeg';
import foundationsAiLogo from '@/assets/certs/foundations-ai.jpeg';
import professionalGenAiLogo from '@/assets/certs/professional-gen-ai.jpg';
import azureAiLogo from '@/assets/certs/azure-ai.jpg';


const certifications = [
  {
    title: 'Oracle Certified Professional: OCI Gen AI 2024 Professional',
    issuer: 'Oracle Corp.',
    date: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=DBA8FBF4F9ED8B4D0C6BE0FB0BDE2D5A03FC96C6B97F1C91E9ECA5D98E87FA40',
    certificateUrl: '/files/eCertificate-prof-gen-ai.pdf',
    description: 'Expertise in OCI Generative AI services',
    status: 'Active',
    logo: professionalGenAiLogo,
  },
  {
    title: 'Microsoft Azure AI Fundamentals (AI-900)',
    issuer: 'Microsoft',
    date: 'Jul 2020',
    credentialUrl: 'https://www.credly.com/badges/2382975e-d741-4ec9-acca-5d8237bbc515',
    certificateUrl: '/files/eCertificate-azure-ai.pdf',
    description: 'Azure AI services and machine learning concepts',
    status: 'Expired',
    logo: azureAiLogo,
  },
  {
    title: 'Oracle Certified Associate Java Programmer I (1Z0-808)',
    issuer: 'Oracle Corp.',
    date: 'Feb 2020',
    credentialUrl: 'https://www.credly.com/badges/6616ad47-2676-4e01-893c-20a4642a8b67',
    certificateUrl: '/files/eCertificate-associate-java.pdf',
    description: 'Certified in Java SE 8 Programming',
    status: 'Lifetime',
    logo: associateJavaLogo,
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Foundations Associate',
    issuer: 'Oracle Corp.',
    date: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=D8974AC1ABE8A550247F4F3D974C866752EE44A8830F2BFE3FC50E20FEC5D646',
    certificateUrl: '/files/eCertificate-foundations.pdf',
    description: 'OCI core concepts and foundations',
    status: 'Active',
    logo: foundationsLogo,
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 Architect Associate',
    issuer: 'Oracle Corp.',
    date: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=1D95571D88756F44E737AEBC4B01A3749E0C2B1BD995C0A4C4EAA6AC26345891',
    certificateUrl: '/files/eCertificate-associate.pdf',
    description: 'Expertise in designing OCI cloud solutions',
    status: 'Active',
    logo: associateLogo,
  },
  {
    title: 'Oracle Cloud Infrastructure 2025 AI Foundations Associate',
    issuer: 'Oracle',
    date: 'Oct 2025',
    credentialUrl: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=47E415AE37C3299E9651B061D8D8E56DCB1F89EF34C6319F8B3A2F1574DA96B1',
    certificateUrl: '/files/eCertificate-foundations-ai.pdf',
    description: 'OCI AI services and ML fundamentals',
    status: 'Active',
    logo: foundationsAiLogo,
  },
];

const gateScores = [
  { year: '2024', exam: 'GATE CS', rank: 'AIR 26' },
  { year: '2023', exam: 'GATE CS', rank: 'AIR 608' },
  { year: '2024', exam: 'GATE DA', rank: 'AIR 648' },
];

const awards = [
  {
    title: 'RGPV University Silver Medal 🥈',
    description: 'Received University Silver Medal for merit in University Finals 2021, from Governor of Madhya Pradesh.',
    year: '2025',
    icon: Medal,
  },
  {
    title: 'RGPV Chancellor Scholarship Award',
    description: 'Received University Scholarship for merit in University Exams 2019, from Governor of Madhya Pradesh.',
    year: '2019',
    icon: Trophy,
  },
  {
    title: '3x Star of the Month @ TCS',
    description: 'Recognized for exceptional performance and contributions during tenure at Tata Consultancy Services.',
    year: '2021-2024',
    icon: Star,
  },
];

export default function AchievementsSection() {
  const [selectedPDF, setSelectedPDF] = useState<{ url: string; title: string } | null>(null);

  const handleCertificateClick = (url: string, title: string) => {
    setSelectedPDF({ url, title });
  };

  return (
    <>
      <section id="achievements" className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Achievements</span> & Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognition and professional credentials
            </p>
          </motion.div>

          {/* GATE Scores */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">GATE Scores</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {gateScores.map((score, index) => (
                <motion.div
                  key={score.year + score.exam}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-xl p-6 text-center min-w-[160px]"
                >
                  <div className="text-3xl font-bold text-gradient">{score.rank}</div>
                  <div className="text-sm font-medium mt-1">{score.exam}</div>
                  <div className="text-xs text-muted-foreground">{score.year}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Certifications - First Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 whitespace-nowrap">
                <Shield className="h-6 w-6 text-primary" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      {/* Certification Logo */}
                      <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-background/50 border border-border/30">
                        <img
                          src={cert.logo}
                          alt={`${cert.title} badge`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm">
                            {cert.title}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                            cert.status === 'Active' ? 'bg-green-500/10 text-green-500' :
                            cert.status === 'Lifetime' ? 'bg-yellow-500/10 text-yellow-500' :
                            cert.status === 'Expired' ? 'bg-red-500/10 text-red-500' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {cert.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{cert.issuer} • {cert.date}</p>
                        <p className="text-xs text-muted-foreground mt-1">{cert.description}</p>
                        <div className="flex gap-4 mt-2">
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              Verify Credential
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {cert.certificateUrl && (
                            <button
                              onClick={() => handleCertificateClick(cert.certificateUrl, cert.title)}
                              className="inline-flex items-center gap-1 text-xs text-accent hover:underline cursor-pointer"
                            >
                              View Certificate
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Awards - Second Column */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 whitespace-nowrap">
                <Award className="h-6 w-6 text-accent" />
                Awards & Honors
              </h3>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="glass rounded-xl p-5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-gradient">
                        <award.icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-semibold">{award.title}</h4>
                          <span className="text-sm text-muted-foreground whitespace-nowrap">
                            {award.year}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {award.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      <PDFViewerModal
        isOpen={!!selectedPDF}
        onClose={() => setSelectedPDF(null)}
        pdfUrl={selectedPDF?.url || ''}
        title={selectedPDF?.title || ''}
      />
    </>
  );
}
