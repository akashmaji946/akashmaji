import { motion } from 'framer-motion';
import { FileText, ExternalLink, Presentation, Video } from 'lucide-react';

type LinkType = 'report' | 'paper' | 'project' | 'demo';

interface ReportLink {
  type: LinkType;
  label: string;
  url: string;
}

interface Report {
  title: string;
  authors: string;
  date: string;
  links: ReportLink[];
}

const reports: Report[] = [
  {
    title: 'GPU Accelerated Scalar Field Reconstruction and Volume Rendering',
    authors: 'Utkarsh Sharma • Akash Maji',
    date: 'December 2025',
    links: [
      { type: 'report', label: 'Technical Report', url: '/reports/GPU_Volume_Rendering_Report.pdf' },
      { type: 'paper', label: 'Paper Presentation', url: '/reports/GPU_Volume_Rendering_Paper.pdf' },
      { type: 'project', label: 'Project Presentation', url: '/reports/GPU_Volume_Rendering_Project.pdf' },
    ],
  },
  {
    title: 'Virtual Machine Image Diffing Tool',
    authors: 'Akash Maji',
    date: 'November 2025',
    links: [
      { type: 'demo', label: 'Project Demo', url: '/reports/VM_Image_Diffing_Demo.pdf' },
    ],
  },
  {
    title: 'BASE: An ACID Alternative',
    authors: 'Akash Maji • Ikshita Pathak • Debanjan Saha',
    date: 'March 2025',
    links: [
      { type: 'paper', label: 'Paper Presentation', url: '/reports/BASE_ACID_Alternative_Paper.pdf' },
    ],
  },
  {
    title: 'GroupJoin: Implementing a Fused Operator',
    authors: 'Akash Maji',
    date: 'June 2025',
    links: [
      { type: 'report', label: 'Technical Report', url: '/reports/GroupJoin_Report_Akash.pdf' },
      { type: 'project', label: 'Project Presentation', url: '/reports/GroupJoin_Project.pdf' },
    ],
  },
  {
    title: 'AMUSJoin: Implementing a New Operator',
    authors: 'Akash Maji • Utkarsh Sharma',
    date: 'December 2024',
    links: [
      { type: 'report', label: 'Technical Report', url: '/reports/DuckDB_AMUS_Join_Report.pdf' },
      { type: 'project', label: 'Project Presentation', url: '/reports/AMUS_Join_Project.pdf' },
    ],
  },
  {
    title: 'CNN Memory Profiling and Optimisation',
    authors: 'Akash Maji • Utkarsh Sharma • Suraj Reddy • Amandeep Nokhwal',
    date: 'April 2025',
    links: [
      { type: 'report', label: 'Technical Report', url: '/reports/CNN_Memory_Profiling_And_Optimisation_Report.pdf' },
      { type: 'project', label: 'Project Presentation', url: '/reports/CNN_Memory_Project.pdf' },
    ],
  },
];

const getLinkIcon = (type: LinkType) => {
  switch (type) {
    case 'report':
      return FileText;
    case 'paper':
    case 'project':
      return Presentation;
    case 'demo':
      return Video;
    default:
      return ExternalLink;
  }
};

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
            <motion.div
              key={report.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 8 }}
              className="glass rounded-xl p-5 flex items-start gap-4 group hover:border-blue-400/30 border border-transparent transition-all"
            >
              <div className="p-3 rounded-lg bg-gradient flex-shrink-0">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {report.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{report.authors}</p>
                <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {report.links.map((link) => {
                    const Icon = getLinkIcon(link.type);
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Icon className="h-3 w-3" />
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
