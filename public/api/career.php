<?php
/**
 * Career Application Handler — PT. Yogura Tekindo
 * Receives job application data via AJAX and sends email directly.
 */

// CORS & Headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Anti-spam honeypot check
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

if (!empty($input['_gotcha'])) {
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit();
}

// ══════════════════════════════════════
// KONFIGURASI EMAIL — Ubah sesuai kebutuhan
// ══════════════════════════════════════
$to = 'hrd@yotek.co.id';
$cc = 'info@yotek.co.id';
$company = 'PT. Yogura Tekindo';
// ══════════════════════════════════════

// Extract form fields
$position = htmlspecialchars($input['position'] ?? '-');
$name     = htmlspecialchars($input['name'] ?? '-');
$email    = htmlspecialchars($input['email'] ?? '-');
$phone    = htmlspecialchars($input['phone'] ?? '-');
$link     = htmlspecialchars($input['link'] ?? '-');
$message  = htmlspecialchars($input['message'] ?? '-');

// Build email
$email_subject = "[Yotek Karir] Lamaran Baru: {$position} — {$name}";

$body = "
══════════════════════════════════════
LAMARAN KERJA BARU DARI WEBSITE YOTEK
══════════════════════════════════════

Posisi      : {$position}
Nama        : {$name}
Email       : {$email}
Telepon     : {$phone}
Portfolio   : {$link}
Waktu       : " . date('d M Y, H:i:s') . " WIB

── Pesan Tambahan ──────────────────
{$message}

══════════════════════════════════════
Email ini dikirim otomatis dari halaman Karir website {$company}.
";

$headers = "From: noreply@yotek.co.id\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Cc: {$cc}\r\n";
$headers .= "X-Mailer: Yotek-Web/1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $email_subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Lamaran terkirim']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Gagal mengirim lamaran']);
}
