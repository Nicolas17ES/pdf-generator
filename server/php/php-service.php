<?php
// Include the FPDF library
require('fpdf186/fpdf.php');

// Only proceed if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ensure the image file is uploaded correctly
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Retrieve form data
        $message = $_POST['message'];
        $image = $_FILES['image'];

        // Get the image file extension
        $imageExtension = strtolower(pathinfo($image['name'], PATHINFO_EXTENSION));

        // Valid extensions for image types
        $validExtensions = ['jpg', 'jpeg', 'png'];
        
        // Check if the image extension is valid
        if (!in_array($imageExtension, $validExtensions)) {
            header("HTTP/1.1 400 Bad Request");
            echo 'Unsupported image type';
            logError('Unsupported image type: ' . $imageExtension);
            exit;
        }

        // Get the temporary file path
        $imagePath = $image['tmp_name'];

        // Ensure the temporary file exists
        if (!file_exists($imagePath)) {
            header("HTTP/1.1 500 Internal Server Error");
            echo 'Uploaded file not found';
            logError('Uploaded file not found: ' . $imagePath);
            exit;
        }

        try {
            // Initialize FPDF
            $pdf = new FPDF();
            $pdf->AddPage();
            $pdf->SetFont('Arial', 'B', 16);
            $pdf->Cell(40, 10, $message);
            $pdf->Ln();

            // Output the PDF directly
            $pdf->Image($imagePath, 10, 20, 50, 50, $imageExtension);
            $pdf->Output('D', 'generated.pdf');

        } catch (Exception $e) {

            header("HTTP/1.1 500 Internal Server Error");
            echo 'Error generating PDF: ' . $e->getMessage();
            logError('Error generating PDF: ' . $e->getMessage());
            exit;
            
        }

    } else {
        // Handle file upload error
        header("HTTP/1.1 400 Bad Request");
        echo 'File upload error: ' . $_FILES['image']['error'];
    }
}
?>

