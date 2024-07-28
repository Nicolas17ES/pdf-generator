<?php
// Include the FPDF library
require('fpdf186/fpdf.php');

// Define the logError function if needed
function logError($message) {
    error_log($message);
}

// Only proceed if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Ensure the image file is uploaded correctly
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        // Retrieve form data
        $image = $_FILES['image'];
        $mimetype = $image['type'];

        // Extract image extension from the mimetype
        $imageExtension = strtolower(explode('/', $mimetype)[1]);

        // Valid extensions for image types
        $validExtensions = ['png'];
        
        error_log("FILES Array: " . print_r($_FILES, true));
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
            $pdf->Ln();

            // Set the width and height for the image
            $width = 160; // Set the width to a larger value
            $height = 160; // Set the height to a larger value

            // Get the width of the page
            $pageWidth = $pdf->GetPageWidth();

            // Calculate X position to center the image
            $x = ($pageWidth - $width) / 2;
            
            // Output the PDF directly
            $pdf->Image($imagePath, $x, 20, $width, $height, $imageExtension);

            // Set font for the text
            $pdf->SetFont('Arial', 'B', 16);

            // Set the text
            $text = "Thank you for using mesplaques. See you soon!";
            // Get the width of the text
            $textWidth = $pdf->GetStringWidth($text);

            // Calculate X position to center the text
            $textX = ($pageWidth - $textWidth) / 2;

            // Calculate Y position for the text (below the image)
            $textY = 20 + $height + 10; // 20 units from the top + image height + some padding

            // Ensure the text doesn't go beyond the page height
            $pageHeight = $pdf->GetPageHeight();
            if ($textY + 10 > $pageHeight) {
                $textY = $pageHeight - 20; // Adjust to fit within the page
            }

            // Set the position and add the text
            $pdf->SetXY($textX, $textY);
            $pdf->Cell($textWidth, 10, $text, 0, 0, 'C');
            
            $pdf->Output('D', 'generated.pdf');

        } catch (Exception $e) {
            header("HTTP/1.1 500 Internal Server Error");
            error_log('Error generating PDF: ' . $e->getMessage());
            if ($e->getPrevious()) {
                error_log('Previous exception: ' . $e->getPrevious()->getMessage());
            }
            exit;
        }

    } else {
        // Handle file upload error
        header("HTTP/1.1 400 Bad Request");
        echo 'File upload error: ' . $_FILES['image']['error'];
    }
}
?>

