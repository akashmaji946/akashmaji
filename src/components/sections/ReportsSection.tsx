import { motion } from 'framer-motion';
import { FileText, ExternalLink } from 'lucide-react';

const reports = [
  {
    title: 'Implementing the GroupJoin in DuckDB',
    authors: 'Akash Maji',
    date: 'June 2025',
    link: 'https://akashmaj.me/reports/GroupJoin_Report_Akash.pdf',
  },
  {
    title: 'DuckDB AMUS Join: A new Join Operator implementation',
    authors: 'Akash Maji • Utkarsh Sharma',
    date: 'December 2024',
    link: 'https://akashmaj.me/reports/DuckDB_AMUS_Join_Report.pdf',
  },
  {
    title: 'CNN Memory Profiling and Optimisation: Toward Efficient Inference',
    authors: 'Akash Maji • Utkarsh Sharma • Suraj Reddy • Amandeep Nokhwal',
    date: 'April 2025',
    link: 'https://akashmaj.me/reports/CNN_Memory_Profiling_And_Optimisation_Report.pdf',
  },
];

export default function ReportsSection() {
  return (
    <section id="reports" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Academic <span className="text-gradient">Reports</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technical reports and presentations from academic coursework
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {reports.map((report, index) => (
            <motion.a
              key={report.title}
              href={report.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 8 }}
              className="glass rounded-xl p-5 flex items-start gap-4 group block"
            >
              <div className="p-3 rounded-lg bg-gradient flex-shrink-0">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {report.title}
                  </h3>
                  <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{report.authors}</p>
                <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
