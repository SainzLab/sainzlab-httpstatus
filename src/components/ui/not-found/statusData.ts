export type HttpStatusCode =
  | "400"
  | "401"
  | "403"
  | "404"
  | "408"
  | "429"
  | "500"
  | "502"
  | "503"
  | "504"

export interface HttpStatusItem {
  code: HttpStatusCode
  title: string
  description: string
}

export const DEFAULT_STATUS_CODE: HttpStatusCode = "404"

export const statusData: Record<HttpStatusCode, HttpStatusItem> = {
  "400": {
    code: "400",
    title: "Bad Request",
    description:
      "Permintaan ini tidak dapat diproses karena format atau tautannya kurang tepat. Periksa kembali URL Anda lalu coba lagi.",
  },
  "401": {
    code: "401",
    title: "Unauthorized",
    description:
      "Halaman ini memerlukan autentikasi. Silakan masuk dengan akun yang valid untuk melanjutkan.",
  },
  "403": {
    code: "403",
    title: "Forbidden",
    description:
      "Anda belum memiliki izin untuk membuka halaman ini. Hubungi administrator jika menurut Anda ini keliru.",
  },
  "404": {
    code: "404",
    title: "Not Found",
    description:
      "Halaman yang Anda cari tidak ditemukan. Tautannya mungkin sudah berubah, dipindahkan, atau tidak lagi tersedia.",
  },
  "408": {
    code: "408",
    title: "Request Timeout",
    description:
      "Server membutuhkan waktu terlalu lama untuk merespons. Periksa koneksi Anda lalu coba muat ulang halaman.",
  },
  "429": {
    code: "429",
    title: "Too Many Requests",
    description:
      "Terlalu banyak aktivitas dalam waktu singkat. Mohon tunggu sejenak sebelum mencoba kembali.",
  },
  "500": {
    code: "500",
    title: "Internal Server Error",
    description:
      "Terjadi kendala pada sistem kami. Tim teknis sedang menanganinya—silakan coba lagi beberapa saat lagi.",
  },
  "502": {
    code: "502",
    title: "Bad Gateway",
    description:
      "Komunikasi antarserver kami sedang mengalami gangguan sementara. Silakan muat ulang halaman dalam beberapa saat.",
  },
  "503": {
    code: "503",
    title: "Service Unavailable",
    description:
      "Layanan sedang dalam pemeliharaan atau menangani trafik tinggi. Silakan periksa kembali beberapa saat lagi.",
  },
  "504": {
    code: "504",
    title: "Gateway Timeout",
    description:
      "Server kami belum merespons tepat waktu. Gangguan ini biasanya sementara—silakan coba lagi nanti.",
  },
}

export function isValidStatusCode(code: string): code is HttpStatusCode {
  return Object.prototype.hasOwnProperty.call(statusData, code)
}

export function isMaintenancePath(pathname: string): boolean {
  const clean = pathname.replace(/^\/+|\/+$/g, "").toLowerCase()
  return clean === "maintenance"
}

export function getStatusFromPath(pathname: string): HttpStatusItem {
  const codeParam = pathname.replace(/^\/+|\/+$/g, "")

  if (codeParam && /^\d{3}$/.test(codeParam) && isValidStatusCode(codeParam)) {
    return statusData[codeParam]
  }

  return statusData[DEFAULT_STATUS_CODE]
}
