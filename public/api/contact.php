<?php
/**
 * Contact Form Handler — PT. Yogura Tekindo
 * Receives form data via AJAX and sends email directly.
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
    // Fallback to POST data
    $input = $_POST;
}

if (!empty($input['_gotcha'])) {
    // Bot detected
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit();
}

// ══════════════════════════════════════
// KONFIGURASI EMAIL — Ubah sesuai kebutuhan
// ══════════════════════════════════════
$to = 'info@yotek.co.id';
$company = 'PT. Yogura Tekindo';
// ══════════════════════════════════════

// Extract form fields
$subject_type = htmlspecialchars($input['subject'] ?? 'Pertanyaan Umum');
$contact_info = htmlspecialchars($input['contact_info'] ?? '-');

// Build email
$email_subject = "[Yotek Website] Pesan Baru: {$subject_type}";

$body = "
══════════════════════════════════════
PESAN BARU DARI WEBSITE YOTEK
══════════════════════════════════════

Kategori    : {$subject_type}
Kontak      : {$contact_info}
Waktu       : " . date('d M Y, H:i:s') . " WIB

══════════════════════════════════════
Email ini dikirim otomatis dari formulir kontak website {$company}.
";

$headers = "From: noreply@yotek.co.id\r\n";
$headers .= "Reply-To: {$contact_info}\r\n";
$headers .= "X-Mailer: Yotek-Web/1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($to, $email_subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email terkirim']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Gagal mengirim email']);
}
