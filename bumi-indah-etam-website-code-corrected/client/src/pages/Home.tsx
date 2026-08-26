/**
 * BIE design reminder: Contemporary industrial editorial. Use Dockline Blue,
 * warehouse ivory, restrained safety orange, precise asymmetry, and operational clarity.
 */
import { FormEvent, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  Expand,
  Globe2,
  MapPin,
  ShieldCheck,
  Warehouse,
} from "lucide-react";
import { toast } from "sonner";

type Locale = "en" | "zh" | "id";

const assets = {
  hero: "/manus-storage/harbour-ledger-hero_de54f6f8.jpg",
  interior: "/manus-storage/harbour-ledger-interior_133458d5.jpg",
  loading: "/manus-storage/harbour-ledger-loading_415eaf37.jpg",
  aerial: "/manus-storage/harbour-ledger-aerial_34377d70.jpg",
  logo: "/manus-storage/harbour-ledger-logo_782eb2d6.png",
};

const copy = {
  en: {
    localeLabel: "EN",
    languageName: "English",
    navSpaces: "Spaces",
    navFacilities: "Facilities",
    navProcess: "How it works",
    navFaq: "FAQ",
    navContact: "Contact",
    navCta: "Request a space",
    eyebrow: "Warehouse rental · Built for movement",
    heroTitle: "Make room for your next shipment.",
    heroText:
      "Flexible warehouse space for growing businesses, local operations, and cross-border trade. Tell us what you need to store — we’ll help you find the right fit.",
    heroPrimary: "Explore available space",
    heroSecondary: "Talk to our team",
    heroNote: "EN / 中文 / ID inquiries welcome",
    tradeRoute: "SAMARINDA / TRADE-READY STORAGE",
    availabilityLabel: "Availability desk",
    availabilityTitle: "Space that works around your operation.",
    availabilityText:
      "Share your preferred size, storage needs, and timing. We’ll prepare a tailored space proposal.",
    availabilityLink: "Request availability",
    introKicker: "A clear place to start",
    introTitle: "One practical home for your inventory.",
    introText:
      "From first cartons to regular pallet movements, our rental format is designed to make space decisions easier. Start with the room you need today, then adjust as your operations evolve.",
    statOne: "Flexible terms",
    statTwo: "Space to scale",
    statThree: "International inquiries",
    spacesKicker: "Current space guide",
    spacesTitle: "Choose the footprint that fits now.",
    spacesText:
      "Start with a practical configuration, then request a tailored availability check for your goods, access needs, and move-in timing.",
    example: "Space profile",
    size: "Size",
    storage: "Best for",
    access: "Access",
    viewDetails: "Request details",
    units: [
      {
        name: "100 m² Bay",
        size: "100 m² / 1,076 sq ft",
        use: "Small inventory & e-commerce",
        access: "Shared loading access",
        rate: "Monthly terms on enquiry",
      },
      {
        name: "250 m² Warehouse",
        size: "250 m² / 2,691 sq ft",
        use: "Pallet storage & distribution",
        access: "Dedicated loading bay",
        rate: "Flexible term options",
      },
      {
        name: "500 m² Trade Space",
        size: "500 m² / 5,382 sq ft",
        use: "High-volume operations",
        access: "Yard & loading access",
        rate: "Site terms on enquiry",
      },
    ],
    facilitiesKicker: "Designed for the working day",
    facilitiesTitle: "The details behind a smoother operation.",
    facilitiesText:
      "Adapt the facilities below to match your site. Clear information on access, security, and handling helps tenants plan with confidence.",
    facilityItems: [
      ["Secure premises", "Add your security, CCTV, access-control, or on-site team details."],
      ["Loading-ready access", "Describe dock levellers, shutters, truck access, and operating hours."],
      ["Space that adapts", "Show whether tenants can change unit size or combine spaces as needed."],
      ["Business-friendly terms", "Add your minimum term, deposit, services, and utility arrangements."],
    ],
    processKicker: "How it works",
    processTitle: "Three steps. A clearer route to space.",
    process: [
      ["01", "Tell us what moves through your space", "Share your preferred location, timing, unit size, goods, and handling needs."],
      ["02", "Review a suitable option", "We’ll guide you through available spaces and the practical terms for each."],
      ["03", "Move in with a plan", "Confirm the details, arrange access, and put your storage operation into motion."],
    ],
    faqKicker: "Before you enquire",
    faqTitle: "Common rental questions, answered clearly.",
    faqIntro: "The answers below are a practical guide. Your final quotation will confirm the exact space, availability, access, and commercial terms for your enquiry.",
    faqItems: [
      { q: "What is the minimum rental period?", a: "The minimum rental period is one year. This provides tenants with a stable and suitable space for their business operations." },
      { q: "What warehouse sizes are available?", a: "Our current space has more than 30 warehouse units built and available across the existing development. Additional units are being developed as part of our continued expansion." },
      { q: "How many units are available?", a: "Availability changes as units are reserved or leased. Share your preferred move-in date and size so we can confirm the latest options." },
      { q: "Is a security deposit required?", a: "Deposit requirements are confirmed as part of the rental proposal and lease agreement." },
      { q: "Are utilities included in the rental?", a: "Utility arrangements can vary by space and use. We will outline the applicable inclusions and any charges in your proposal." },
      { q: "Is the warehouse suitable for trucks?", a: "Truck access depends on the selected space and loading requirements. Tell us your vehicle type and loading schedule so we can advise on a suitable option." },
      { q: "What businesses are permitted to operate from the warehouse?", a: "Permitted uses are assessed with your enquiry. Please describe your goods, storage activities, and operational needs for confirmation." },
      { q: "Are there additional maintenance charges?", a: "Any applicable maintenance, service, or site charges will be clearly stated in the proposed rental terms." },
      { q: "Can I inspect the warehouse before leasing?", a: "Yes. Contact us to request an inspection and we will coordinate a suitable viewing time." },
      { q: "What documents are required to rent a unit?", a: "The required documents are confirmed during the application process. They may include company and authorised representative details relevant to the lease." },
      { q: "What are the payment terms?", a: "Payment timing and accepted methods will be set out in the quotation and lease agreement before you commit." },
    ],
    inquiryKicker: "Start a conversation",
    inquiryTitle: "Tell us what you need to store.",
    inquiryText:
      "Share the size, move-in date, and type of goods you have in mind. We will use this information to prepare a practical next step for your enquiry.",
    officeLabel: "Office & enquiry location",
    formName: "Your name",
    formCompany: "Company name",
    formEmail: "Business email",
    formPhone: "Phone / WhatsApp",
    formNeed: "What do you need to store?",
    formNeedPlaceholder: "Unit size, timing, goods, special access requirements…",
    formSubmit: "Send enquiry",
    formNote: "We’ll use your details only to respond to this request.",
    success: "Thank you. Your enquiry has been recorded for the next availability review.",
    footerLine: "Warehouse rental for businesses moving forward.",
    footerEdit: "Samarinda warehouse enquiries in English, Chinese, and Indonesian.",
    footerTop: "Back to top",
    footerCompany: "BUMI INDAH ETAM",
  },
  zh: {
    localeLabel: "中文",
    languageName: "中文",
    navSpaces: "仓储空间",
    navFacilities: "设施",
    navProcess: "租赁流程",
    navFaq: "常见问题",
    navContact: "联系我们",
    navCta: "咨询仓位",
    eyebrow: "仓库租赁 · 为货物流动而设",
    heroTitle: "为您的下一批货物腾出空间。",
    heroText:
      "为成长型企业、本地运营和跨境贸易提供灵活仓储空间。告诉我们您需要存放什么，我们会协助您找到合适的方案。",
    heroPrimary: "查看仓储空间",
    heroSecondary: "联系团队",
    heroNote: "欢迎使用英文 / 中文 / 印尼语咨询",
    tradeRoute: "SAMARINDA / 跨境贸易仓储",
    availabilityLabel: "仓位咨询台",
    availabilityTitle: "配合您业务节奏的仓储空间。",
    availabilityText: "告诉我们您的面积、存储需求和进驻时间，我们会为您准备适合的仓储方案。",
    availabilityLink: "咨询可用仓位",
    introKicker: "从清晰的第一步开始",
    introTitle: "为您的库存提供一个实用的家。",
    introText:
      "无论是首批纸箱还是固定的托盘进出，我们的租赁方式旨在让仓储决策更简单。先从今天所需的空间开始，再随业务发展灵活调整。",
    statOne: "灵活租期",
    statTwo: "可扩展空间",
    statThree: "支持国际咨询",
    spacesKicker: "仓位参考",
    spacesTitle: "选择适合目前业务规模的空间。",
    spacesText: "从实用的配置开始，再根据货物、出入需求和进驻时间咨询合适的可用仓位。",
    example: "仓位资料",
    size: "面积",
    storage: "适合用途",
    access: "出入条件",
    viewDetails: "咨询详情",
    units: [
      { name: "100 m² 仓位", size: "100 m² / 1,076 平方英尺", use: "小型库存与电商", access: "共享装卸通道", rate: "月租条款面议" },
      { name: "250 m² 仓库", size: "250 m² / 2,691 平方英尺", use: "托盘存储与配送", access: "专用装卸月台", rate: "提供灵活租期" },
      { name: "500 m² 贸易空间", size: "500 m² / 5,382 平方英尺", use: "大批量运营", access: "货场及装卸通道", rate: "场地条款面议" },
    ],
    facilitiesKicker: "为日常运营而设计",
    facilitiesTitle: "让营运更顺畅的细节。",
    facilitiesText: "请根据您的实际场地调整以下设施说明。清楚说明出入、安保和货物处理，有助于客户安心规划。",
    facilityItems: [
      ["安全场地", "补充您的安保、闭路电视、门禁或现场团队资料。"],
      ["装卸便利", "说明月台、卷帘门、货车出入和营业时间。"],
      ["可灵活调整的空间", "说明客户是否可以调整面积或合并仓位。"],
      ["适合企业的条款", "补充最短租期、押金、服务和水电安排。"],
    ],
    processKicker: "租赁流程",
    processTitle: "三个步骤，清楚安排您的仓储空间。",
    process: [
      ["01", "告诉我们货物与空间需求", "分享您希望的地点、时间、面积、货物类型和装卸需求。"],
      ["02", "了解合适的方案", "我们会为您介绍可用空间，以及每个方案的实际租赁条款。"],
      ["03", "有计划地进驻", "确认细节、安排出入事宜，然后开始您的仓储运营。"],
    ],
    faqKicker: "咨询前须知",
    faqTitle: "常见租赁问题，清晰解答。",
    faqIntro: "以下内容为实用参考。最终报价会根据您的咨询，确认具体仓位、可用情况、出入安排和商业条款。",
    faqItems: [
      { q: "最短租期是多久？", a: "最短租期为一年。这为租户提供稳定且适合业务运营的空间。" },
      { q: "有哪些仓库面积可供选择？", a: "目前开发项目已建成并可提供超过 30 个仓库单元。随着持续扩展，更多单元正在开发中。" },
      { q: "目前有多少个仓位可租？", a: "仓位会随着预订或签约而变化。请告知您希望进驻的日期和面积，我们会确认最新选项。" },
      { q: "需要支付押金吗？", a: "押金要求会在租赁方案和合同中确认。" },
      { q: "租金是否包含水电？", a: "水电安排可能因空间和用途而异。我们会在方案中列明包含项目及适用费用。" },
      { q: "仓库适合货车进出吗？", a: "货车出入取决于所选空间和装卸要求。请告知车辆类型和装卸时间，我们会建议适合的方案。" },
      { q: "哪些业务可以在仓库内经营？", a: "许可用途会根据您的咨询进行确认。请说明货物、仓储活动和营运需求。" },
      { q: "是否有额外维护费用？", a: "如有适用的维护、服务或场地费用，都会在租赁条款中清楚列明。" },
      { q: "签约前可以参观仓库吗？", a: "可以。请联系我们预约参观，我们会协调合适的看仓时间。" },
      { q: "租赁仓位需要哪些文件？", a: "所需文件会在申请流程中确认，可能包括与租约相关的公司资料及授权代表资料。" },
      { q: "付款条款是什么？", a: "付款时间和可接受的付款方式会在您确认前的报价及租约中列明。" },
    ],
    inquiryKicker: "开始沟通",
    inquiryTitle: "告诉我们您需要存放什么。",
    inquiryText: "请分享所需面积、进驻日期和货物类型。我们会根据这些资料，为您的咨询准备实用的下一步建议。",
    officeLabel: "办公室及咨询地点",
    formName: "您的姓名",
    formCompany: "公司名称",
    formEmail: "企业邮箱",
    formPhone: "电话 / WhatsApp",
    formNeed: "您需要存放什么？",
    formNeedPlaceholder: "面积、进驻时间、货物、特殊出入需求……",
    formSubmit: "发送咨询",
    formNote: "我们只会使用您的资料来回应这项咨询。",
    success: "谢谢。您的咨询已记录，等待下一轮仓位确认。",
    footerLine: "为不断前进的企业提供仓库租赁。",
    footerEdit: "为使用英文、中文和印尼语咨询的客户提供三马林达仓储服务。",
    footerTop: "返回顶部",
    footerCompany: "BUMI INDAH ETAM",
  },
  id: {
    localeLabel: "ID",
    languageName: "Bahasa Indonesia",
    navSpaces: "Ruang",
    navFacilities: "Fasilitas",
    navProcess: "Cara kerja",
    navFaq: "FAQ",
    navContact: "Kontak",
    navCta: "Minta ruang",
    eyebrow: "Sewa gudang · Dibuat untuk pergerakan bisnis",
    heroTitle: "Siapkan ruang untuk pengiriman Anda berikutnya.",
    heroText:
      "Ruang gudang fleksibel untuk bisnis yang berkembang, operasional lokal, dan perdagangan lintas negara. Ceritakan kebutuhan penyimpanan Anda — kami akan membantu menemukan pilihan yang tepat.",
    heroPrimary: "Lihat ruang tersedia",
    heroSecondary: "Bicara dengan tim kami",
    heroNote: "Pertanyaan dalam EN / 中文 / ID diterima",
    tradeRoute: "SAMARINDA / PENYIMPANAN SIAP PERDAGANGAN",
    availabilityLabel: "Meja ketersediaan",
    availabilityTitle: "Ruang yang mengikuti operasi bisnis Anda.",
    availabilityText: "Berikan ukuran, kebutuhan penyimpanan, dan waktu yang Anda inginkan. Kami akan menyiapkan proposal ruang yang sesuai.",
    availabilityLink: "Tanyakan ketersediaan",
    introKicker: "Mulai dengan jelas",
    introTitle: "Satu tempat praktis untuk inventaris Anda.",
    introText:
      "Mulai dari karton pertama hingga pergerakan palet rutin, format sewa kami dirancang agar keputusan tentang ruang terasa lebih mudah. Mulailah dengan ruang yang Anda perlukan hari ini, lalu sesuaikan saat bisnis berkembang.",
    statOne: "Syarat fleksibel",
    statTwo: "Ruang untuk bertumbuh",
    statThree: "Pertanyaan internasional",
    spacesKicker: "Panduan ruang saat ini",
    spacesTitle: "Pilih ukuran yang cocok untuk kebutuhan saat ini.",
    spacesText: "Mulai dengan konfigurasi praktis, lalu ajukan pemeriksaan ketersediaan sesuai barang, kebutuhan akses, dan waktu masuk Anda.",
    example: "Profil ruang",
    size: "Ukuran",
    storage: "Cocok untuk",
    access: "Akses",
    viewDetails: "Minta detail",
    units: [
      { name: "Ruang 100 m²", size: "100 m² / 1.076 sq ft", use: "Inventaris kecil & e-commerce", access: "Akses bongkar bersama", rate: "Syarat bulanan sesuai permintaan" },
      { name: "Gudang 250 m²", size: "250 m² / 2.691 sq ft", use: "Penyimpanan palet & distribusi", access: "Area bongkar khusus", rate: "Pilihan masa sewa fleksibel" },
      { name: "Ruang Dagang 500 m²", size: "500 m² / 5.382 sq ft", use: "Operasi bervolume tinggi", access: "Akses halaman & bongkar", rate: "Syarat lokasi sesuai permintaan" },
    ],
    facilitiesKicker: "Dibuat untuk hari kerja",
    facilitiesTitle: "Detail untuk operasi yang lebih lancar.",
    facilitiesText: "Sesuaikan fasilitas di bawah ini dengan lokasi Anda. Informasi jelas tentang akses, keamanan, dan penanganan membantu penyewa merencanakan dengan yakin.",
    facilityItems: [
      ["Area aman", "Tambahkan informasi keamanan, CCTV, akses kontrol, atau tim di lokasi."],
      ["Akses siap muat", "Jelaskan dock leveller, pintu roller, akses truk, dan jam operasional."],
      ["Ruang yang beradaptasi", "Tunjukkan apakah penyewa dapat mengganti ukuran atau menggabungkan ruang."],
      ["Syarat ramah bisnis", "Tambahkan masa sewa minimum, deposit, layanan, dan pengaturan utilitas."],
    ],
    processKicker: "Cara kerja",
    processTitle: "Tiga langkah. Jalur yang lebih jelas menuju ruang.",
    process: [
      ["01", "Ceritakan kebutuhan pergerakan barang Anda", "Bagikan lokasi, waktu, ukuran unit, jenis barang, dan kebutuhan penanganan."],
      ["02", "Tinjau pilihan yang sesuai", "Kami akan memandu Anda melalui ruang tersedia dan syarat praktis setiap pilihan."],
      ["03", "Mulai menempati dengan rencana", "Konfirmasi detail, atur akses, lalu mulai operasi penyimpanan Anda."],
    ],
    faqKicker: "Sebelum bertanya",
    faqTitle: "Pertanyaan sewa yang umum, dijawab dengan jelas.",
    faqIntro: "Jawaban berikut adalah panduan praktis. Penawaran akhir Anda akan mengonfirmasi ruang, ketersediaan, akses, dan ketentuan komersial yang tepat.",
    faqItems: [
      { q: "Berapa masa sewa minimum?", a: "Masa sewa minimum adalah satu tahun. Ini memberikan penyewa ruang yang stabil dan sesuai untuk operasi bisnis mereka." },
      { q: "Ukuran gudang apa yang tersedia?", a: "Pengembangan kami saat ini memiliki lebih dari 30 unit gudang yang telah dibangun dan tersedia. Unit tambahan sedang dikembangkan sebagai bagian dari ekspansi berkelanjutan kami." },
      { q: "Berapa unit yang tersedia?", a: "Ketersediaan berubah saat unit dipesan atau disewa. Beri tahu tanggal masuk dan ukuran pilihan Anda agar kami dapat mengonfirmasi opsi terbaru." },
      { q: "Apakah diperlukan uang jaminan?", a: "Persyaratan deposit akan dikonfirmasi sebagai bagian dari proposal sewa dan perjanjian sewa." },
      { q: "Apakah utilitas sudah termasuk dalam sewa?", a: "Pengaturan utilitas dapat berbeda menurut ruang dan penggunaannya. Kami akan menjelaskan cakupan dan biaya yang berlaku dalam proposal Anda." },
      { q: "Apakah gudang cocok untuk truk?", a: "Akses truk bergantung pada ruang dan kebutuhan bongkar muat yang dipilih. Informasikan jenis kendaraan serta jadwal pemuatan Anda agar kami dapat memberi saran." },
      { q: "Usaha apa yang diizinkan beroperasi dari gudang?", a: "Penggunaan yang diizinkan akan dinilai bersama pertanyaan Anda. Jelaskan barang, kegiatan penyimpanan, dan kebutuhan operasional untuk dikonfirmasi." },
      { q: "Apakah ada biaya perawatan tambahan?", a: "Setiap biaya perawatan, layanan, atau lokasi yang berlaku akan dijelaskan dengan jelas dalam ketentuan sewa yang diusulkan." },
      { q: "Bisakah saya memeriksa gudang sebelum menyewa?", a: "Bisa. Hubungi kami untuk meminta inspeksi dan kami akan mengatur waktu kunjungan yang sesuai." },
      { q: "Dokumen apa yang diperlukan untuk menyewa unit?", a: "Dokumen yang dibutuhkan akan dikonfirmasi selama proses aplikasi. Dokumen tersebut dapat mencakup detail perusahaan dan perwakilan berwenang terkait sewa." },
      { q: "Apa ketentuan pembayarannya?", a: "Jadwal pembayaran dan metode yang diterima akan dijelaskan dalam penawaran dan perjanjian sewa sebelum Anda berkomitmen." },
    ],
    inquiryKicker: "Mulai percakapan",
    inquiryTitle: "Ceritakan apa yang perlu Anda simpan.",
    inquiryText: "Sampaikan ukuran, tanggal masuk, dan jenis barang yang Anda pikirkan. Kami akan menggunakan informasi ini untuk menyiapkan langkah selanjutnya yang praktis.",
    officeLabel: "Lokasi kantor & pertanyaan",
    formName: "Nama Anda",
    formCompany: "Nama perusahaan",
    formEmail: "Email bisnis",
    formPhone: "Telepon / WhatsApp",
    formNeed: "Apa yang perlu Anda simpan?",
    formNeedPlaceholder: "Ukuran unit, waktu, barang, kebutuhan akses khusus…",
    formSubmit: "Kirim pertanyaan",
    formNote: "Kami hanya menggunakan detail Anda untuk menanggapi permintaan ini.",
    success: "Terima kasih. Pertanyaan Anda telah dicatat untuk tinjauan ketersediaan berikutnya.",
    footerLine: "Sewa gudang untuk bisnis yang bergerak maju.",
    footerEdit: "Pertanyaan sewa gudang Samarinda dalam bahasa Inggris, Mandarin, dan Indonesia.",
    footerTop: "Kembali ke atas",
    footerCompany: "BUMI INDAH ETAM",
  },
};

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [language, setLanguage] = useState<Locale>("en");
  const c = copy[language];

function submitInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  const formData = new FormData(event.currentTarget);

  const name = formData.get("name")?.toString().trim() || "-";
  const company = formData.get("company")?.toString().trim() || "-";
  const email = formData.get("email")?.toString().trim() || "-";
  const phone = formData.get("phone")?.toString().trim() || "-";
  const needs = formData.get("needs")?.toString().trim() || "-";

  const message = [
    "Hello BIE Warehouse, I would like to make an inquiry.",
    "",
    `Name: ${name}`,
    `Company: ${company}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Requirements: ${needs}`,
  ].join("\n");

  const whatsappNumber = "6281298981300";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message )}`;

  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
}

  return (
    <div className="site-shell" lang={language === "zh" ? "zh-CN" : language}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label={`${c.footerCompany} home`}>
          <img src={assets.logo} alt="" className="brand-mark" />
          <span className="brand-name">BUMI INDAH ETAM</span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <button type="button" onClick={() => scrollToId("spaces")}>{c.navSpaces}</button>
          <button type="button" onClick={() => scrollToId("facilities")}>{c.navFacilities}</button>
          <button type="button" onClick={() => scrollToId("process")}>{c.navProcess}</button>
          <button type="button" onClick={() => scrollToId("faq")}>{c.navFaq}</button>
          <button type="button" onClick={() => scrollToId("contact")}>{c.navContact}</button>
        </nav>

        <div className="header-actions">
          <label className="language-select" aria-label="Select website language">
            <Globe2 size={15} strokeWidth={1.8} />
            <select value={language} onChange={(event) => setLanguage(event.target.value as Locale)}>
              <option value="en">EN</option>
              <option value="zh">中文</option>
              <option value="id">ID</option>
            </select>
            <ChevronRight size={14} className="select-chevron" />
          </label>
          <button className="nav-cta" type="button" onClick={() => scrollToId("contact")}>
            <span>{c.navCta}</span><ArrowUpRight size={16} />
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow"><span />{c.eyebrow}</p>
            <h1 id="hero-heading">{c.heroTitle}</h1>
            <p className="hero-description">{c.heroText}</p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={() => scrollToId("spaces")}>
                {c.heroPrimary}<ArrowDown size={17} />
              </button>
              <button className="text-action" type="button" onClick={() => scrollToId("contact")}>
                {c.heroSecondary}<ArrowUpRight size={16} />
              </button>
            </div>
            <p className="hero-language-note"><Globe2 size={14} />{c.heroNote}</p>
            <div className="trade-route"><span>ROUTE / 01</span><strong>{c.tradeRoute}</strong></div>
          </div>
          <div className="hero-image-wrap">
            <img src={assets.hero} alt="Modern warehouse loading bays" className="hero-image" />
            <div className="hero-caption"><span>01</span><p>WAREHOUSE / RENTAL</p></div>
          </div>
          <aside className="availability-card">
            <div className="availability-icon"><img src={assets.logo} alt="" /><ClipboardList size={18} /></div>
            <div>
              <p className="card-kicker">{c.availabilityLabel}</p>
              <h2>{c.availabilityTitle}</h2>
              <p>{c.availabilityText}</p>
              <button type="button" onClick={() => scrollToId("contact")}>{c.availabilityLink}<ArrowUpRight size={15} /></button>
            </div>
          </aside>
        </section>

        <section className="intro-section" aria-labelledby="intro-heading">
          <div className="intro-rule"><span>02</span></div>
          <div className="intro-layout">
            <p className="eyebrow dark-eyebrow"><span />{c.introKicker}</p>
            <h2 id="intro-heading">{c.introTitle}</h2>
            <div className="intro-detail">
              <p>{c.introText}</p>
              <div className="intro-stats">
                {[c.statOne, c.statTwo, c.statThree].map((item, index) => (
                  <div key={item}><strong>0{index + 1}</strong><span>{item}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="spaces-section" id="spaces" aria-labelledby="spaces-heading">
          <div className="section-header">
            <div>
              <p className="eyebrow"><span />{c.spacesKicker}</p>
              <h2 id="spaces-heading">{c.spacesTitle}</h2>
            </div>
            <p>{c.spacesText}</p>
          </div>
          <div className="space-grid">
            {c.units.map((unit, index) => (
              <article className={`space-card card-${index + 1}`} key={unit.name}>
                <div className="space-topline"><span><img src={assets.logo} alt="" />{c.example}</span><span>0{index + 1}</span></div>
                <h3>{unit.name}</h3>
                <div className="space-facts">
                  <div><p>{c.size}</p><strong>{unit.size}</strong></div>
                  <div><p>{c.storage}</p><strong>{unit.use}</strong></div>
                  <div><p>{c.access}</p><strong>{unit.access}</strong></div>
                </div>
                <div className="space-footer">
                  <span>{unit.rate}</span>
                  <button type="button" onClick={() => scrollToId("contact")} aria-label={`${c.viewDetails}: ${unit.name}`}><ArrowUpRight size={18} /></button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="facilities-section" id="facilities" aria-labelledby="facilities-heading">
          <div className="facility-image-panel">
            <img src={assets.interior} alt="Clean modern warehouse interior with storage aisles" />
            <div className="image-index"><span>03</span><span>INTERIOR / BAY ACCESS</span></div>
          </div>
          <div className="facility-copy-panel">
            <p className="eyebrow dark-eyebrow"><span />{c.facilitiesKicker}</p>
            <h2 id="facilities-heading">{c.facilitiesTitle}</h2>
            <p className="facility-intro">{c.facilitiesText}</p>
            <div className="facility-list">
              {c.facilityItems.map(([title, text], index) => (
                <article key={title}>
                  <div className="facility-number">0{index + 1}</div>
                  <div><h3>{title}</h3><p>{text}</p></div>
                  <Check size={19} strokeWidth={1.8} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="operation-strip" aria-label="Operational details">
          <div className="strip-image"><img src={assets.loading} alt="Warehouse loading dock with access equipment" /></div>
          <div className="strip-fact"><Warehouse size={25} /><span>BAY / WAREHOUSE</span><strong>{language === "en" ? "Operational space" : language === "zh" ? "运营型仓储空间" : "Ruang operasional"}</strong></div>
          <div className="strip-fact"><ShieldCheck size={25} /><span>GATE / ACCESS</span><strong>{language === "en" ? "Plan with clarity" : language === "zh" ? "清晰安排出入" : "Rencanakan dengan jelas"}</strong></div>
          <div className="strip-fact"><Clock3 size={25} /><span>LEDGER / TERMS</span><strong>{language === "en" ? "Confirm the details" : language === "zh" ? "确认租赁资料" : "Konfirmasi detail"}</strong></div>
        </section>

        <section className="process-section" id="process" aria-labelledby="process-heading">
          <div className="process-heading">
            <p className="eyebrow"><span />{c.processKicker}</p>
            <h2 id="process-heading">{c.processTitle}</h2>
            <img src={assets.aerial} alt="Aerial view of a warehouse complex" />
          </div>
          <div className="process-list">
            {c.process.map(([number, title, description]) => (
              <article key={number}>
                <p>{number}</p>
                <h3>{title}</h3>
                <p>{description}</p>
                <ChevronRight size={20} />
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section" id="faq" aria-labelledby="faq-heading">
          <div className="faq-heading">
            <p className="eyebrow dark-eyebrow"><span />{c.faqKicker}</p>
            <h2 id="faq-heading">{c.faqTitle}</h2>
            <p>{c.faqIntro}</p>
            <div className="faq-stamp"><img src={assets.logo} alt="" /><span>FAQ / 11</span></div>
          </div>
          <Accordion type="single" collapsible className="faq-accordion">
            {c.faqItems.map((item, index) => (
              <AccordionItem key={item.q} value={`faq-${index + 1}`} className="faq-item">
                <AccordionTrigger className="faq-trigger">
                  <span className="faq-number">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.q}</span>
                </AccordionTrigger>
                <AccordionContent className="faq-content"><p>{item.a}</p></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-heading">
          <div className="contact-intro">
            <p className="eyebrow"><span />{c.inquiryKicker}</p>
            <h2 id="contact-heading">{c.inquiryTitle}</h2>
            <p>{c.inquiryText}</p>
            <div className="contact-location"><MapPin size={19} /><div><strong>{c.officeLabel}</strong><span>Jl. A.M. Sangaji No.10, Bandara, Kec. Sungai Pinang, Kota Samarinda, Kalimantan Timur 75242</span></div></div>
          </div>
          <form className="inquiry-form" onSubmit={submitInquiry}>
            <div className="form-row">
              <label>{c.formName}<input required name="name" placeholder={c.formName} /></label>
              <label>{c.formCompany}<input name="company" placeholder={c.formCompany} /></label>
            </div>
            <div className="form-row">
              <label>{c.formEmail}<input required type="email" name="email" placeholder="name@company.com" /></label>
              <label>{c.formPhone}<input name="phone" placeholder="+00 000 000 000" /></label>
            </div>
            <label>{c.formNeed}<textarea required name="needs" rows={4} placeholder={c.formNeedPlaceholder} /></label>
            <div className="form-bottom"><button className="primary-action" type="submit">{c.formSubmit}<ArrowUpRight size={17} /></button><p>{c.formNote}</p></div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand"><img src={assets.logo} alt="" /><span>BUMI INDAH ETAM</span></div>
        <div><strong>{c.footerLine}</strong><p>{c.footerEdit}</p></div>
        <button type="button" onClick={() => scrollToId("top")}>{c.footerTop}<ArrowUpRight size={16} /></button>
      </footer>
    </div>
  );
}
