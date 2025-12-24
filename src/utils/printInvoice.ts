import { CheckoutHistory } from "@/types/checkout";
import { formatPrice } from "@/utils/formatPrice";
import { getStatusText } from "@/types/checkout";

/**
 * Generate and print a formatted receipt
 */
export const handlePrintReceipt = (checkout: CheckoutHistory) => {
  const subtotal = checkout.totalPrice || 0;
  const tax = subtotal * 0.075;
  const total = subtotal + tax;

  const items = checkout.items || [];

  const receiptWindow = window.open("", "_blank");
  if (!receiptWindow) {
    alert("Please allow pop-ups to print receipt");
    return;
  }

  const receiptHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Receipt - Order #${checkout._id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Courier New', monospace;
            padding: 20mm;
            background: white;
            color: black;
          }
          
          .receipt {
            max-width: 80mm;
            margin: 0 auto;
          }
          
          .header {
            text-align: center;
            border-bottom: 2px dashed #000;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          
          .company-name {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
          }
          
          .receipt-title {
            font-size: 16px;
            font-weight: bold;
            margin: 10px 0;
          }
          
          .info-section {
            margin: 15px 0;
            font-size: 12px;
          }
          
          .info-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          
          .items-section {
            margin: 15px 0;
            border-top: 2px dashed #000;
            border-bottom: 2px dashed #000;
            padding: 10px 0;
          }
          
          .item {
            margin: 8px 0;
            font-size: 12px;
          }
          
          .item-name {
            font-weight: bold;
          }
          
          .item-details {
            display: flex;
            justify-content: space-between;
            margin-top: 3px;
          }
          
          .totals-section {
            margin: 15px 0;
            font-size: 12px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
          }
          
          .total-row.grand-total {
            font-size: 14px;
            font-weight: bold;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #000;
          }
          
          .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 10px;
            border-top: 2px dashed #000;
            font-size: 11px;
          }
          
          .thank-you {
            font-weight: bold;
            margin: 10px 0;
          }
          
          @media print {
            body {
              padding: 0;
            }
            
            @page {
              margin: 10mm;
              size: 80mm auto;
            }
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="company-name">TechNest</div>
            <div>123 Store Street</div>
            <div>City, State 12345</div>
            <div>Tel: (123) 456-7890</div>
          </div>
          
          <div class="receipt-title">RECEIPT</div>
          
          <div class="info-section">
            <div class="info-row">
              <span>Order #:</span>
              <span>${checkout._id.slice(0, 8).toUpperCase()}</span>
            </div>
            <div class="info-row">
              <span>Date:</span>
              <span>${new Date(checkout.createdAt).toLocaleString()}</span>
            </div>
            <div class="info-row">
              <span>Status:</span>
              <span>${getStatusText(checkout.status)}</span>
            </div>
            ${
              checkout.paymentReference
                ? `
            <div class="info-row">
              <span>Ref:</span>
              <span>${checkout.paymentReference}</span>
            </div>
            `
                : ""
            }
          </div>
          
          <div class="items-section">
            ${
              items
                .map(
                  (item) => `
              <div class="item">
                <div class="item-name">${item.product?.name || "Product"}</div>
                <div class="item-details">
                  <span>${item.quantity} x ₦${formatPrice(
                    item.product?.price || 0
                  )}</span>
                  <span>₦${formatPrice(
                    (item.product?.price || 0) * item.quantity
                  )}</span>
                </div>
              </div>
            `
                )
                .join("") || "<div>No items</div>"
            }
          </div>
          
          <div class="totals-section">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>₦${formatPrice(subtotal)}</span>
            </div>
            <div class="total-row">
              <span>Tax (7.5%):</span>
              <span>₦${formatPrice(tax)}</span>
            </div>
            <div class="total-row">
              <span>Shipping:</span>
              <span>₦0.00</span>
            </div>
            <div class="total-row grand-total">
              <span>TOTAL:</span>
              <span>₦${formatPrice(total)}</span>
            </div>
          </div>
          
          ${
            checkout.shippingAddress
              ? `
          <div class="info-section">
            <div style="font-weight: bold; margin-bottom: 5px;">Shipping Address:</div>
            <div>${checkout.shippingAddress}</div>
          </div>
          `
              : ""
          }
          
          <div class="footer">
            <div class="thank-you">Thank You For Your Purchase!</div>
            <div>For questions, contact support@yourstore.com</div>
            <div style="margin-top: 10px;">** Keep this receipt for your records **</div>
          </div>
        </div>
        
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `;

  receiptWindow.document.write(receiptHTML);
  receiptWindow.document.close();
};

/**
 * Generate and download a PDF invoice
 */
export const handleDownloadInvoice = (checkout: CheckoutHistory) => {
  const subtotal = checkout.totalPrice || 0;
  const tax = subtotal * 0.075;
  const total = subtotal + tax;

  const items = checkout.items || [];

  const invoiceWindow = window.open("", "_blank");
  if (!invoiceWindow) {
    alert("Please allow pop-ups to download invoice");
    return;
  }

  const invoiceHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice - ${checkout._id}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            padding: 40px;
            background: white;
            color: #000;
            line-height: 1.6;
          }
          
          .invoice {
            max-width: 800px;
            margin: 0 auto;
            background: white;
          }
          
          .invoice-header {
            display: flex;
            justify-content: space-between;
            align-items: start;
            border-bottom: 3px solid #10b981;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .company-info {
            flex: 1;
          }
          
          .company-name {
            font-size: 28px;
            font-weight: bold;
            color: #10b981;
            margin-bottom: 10px;
          }
          
          .company-details {
            font-size: 14px;
            color: #666;
          }
          
          .invoice-title {
            text-align: right;
          }
          
          .invoice-title h1 {
            font-size: 36px;
            color: #1f2937;
            margin-bottom: 5px;
          }
          
          .invoice-number {
            font-size: 14px;
            color: #666;
          }
          
          .invoice-details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }
          
          .detail-section {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
          }
          
          .detail-section h3 {
            font-size: 14px;
            color: #10b981;
            text-transform: uppercase;
            margin-bottom: 15px;
            font-weight: 600;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 8px;
            font-size: 14px;
          }
          
          .detail-label {
            color: #6b7280;
          }
          
          .detail-value {
            color: #1f2937;
            font-weight: 500;
          }
          
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          
          .items-table thead {
            background: #1f2937;
            color: white;
          }
          
          .items-table th {
            padding: 12px;
            text-align: left;
            font-weight: 600;
            font-size: 14px;
          }
          
          .items-table th:last-child,
          .items-table td:last-child {
            text-align: right;
          }
          
          .items-table tbody tr {
            border-bottom: 1px solid #e5e7eb;
          }
          
          .items-table tbody tr:hover {
            background: #f9fafb;
          }
          
          .items-table td {
            padding: 15px 12px;
            font-size: 14px;
            color: #374151;
          }
          
          .item-name {
            font-weight: 500;
            color: #1f2937;
          }
          
          .totals-section {
            margin-top: 30px;
            display: flex;
            justify-content: flex-end;
          }
          
          .totals-table {
            width: 350px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            font-size: 14px;
          }
          
          .total-row.subtotal,
          .total-row.tax,
          .total-row.shipping {
            color: #6b7280;
          }
          
          .total-row.grand-total {
            border-top: 2px solid #10b981;
            margin-top: 10px;
            padding-top: 15px;
            font-size: 18px;
            font-weight: bold;
            color: #10b981;
          }
          
          .shipping-info {
            background: #f9fafb;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
          }
          
          .shipping-info h3 {
            font-size: 14px;
            color: #10b981;
            text-transform: uppercase;
            margin-bottom: 10px;
            font-weight: 600;
          }
          
          .shipping-address {
            color: #374151;
            font-size: 14px;
          }
          
          .invoice-footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
          }
          
          .footer-note {
            margin-top: 10px;
            font-style: italic;
          }
          
          @media print {
            body {
              padding: 20px;
            }
            
            @page {
              margin: 20mm;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="invoice-header">
            <div class="company-info">
              <div class="company-name">TechNest</div>
              <div class="company-details">
                123 Store Street<br>
                City, State 12345<br>
                Phone: (123) 456-7890<br>
                Email: sales@technest.com
              </div>
            </div>
            <div class="invoice-title">
              <h1>INVOICE</h1>
              <div class="invoice-number">#${checkout._id
                .slice(0, 8)
                .toUpperCase()}</div>
            </div>
          </div>
          
          <div class="invoice-details">
            <div class="detail-section">
              <h3>Invoice Details</h3>
              <div class="detail-row">
                <span class="detail-label">Invoice Date:</span>
                <span class="detail-value">${new Date(
                  checkout.createdAt
                ).toLocaleDateString()}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Order Status:</span>
                <span class="detail-value">${getStatusText(
                  checkout.status
                )}</span>
              </div>
              ${
                checkout.paymentReference
                  ? `
              <div class="detail-row">
                <span class="detail-label">Payment Ref:</span>
                <span class="detail-value">${checkout.paymentReference}</span>
              </div>
              `
                  : ""
              }
            </div>
            
            <div class="detail-section">
              <h3>Payment Information</h3>
              <div class="detail-row">
                <span class="detail-label">Payment Method:</span>
                <span class="detail-value">${
                  checkout.paymentMethod?.replace("-", " ").toUpperCase() ||
                  "N/A"
                }</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Payment Status:</span>
                <span class="detail-value">${
                  checkout.status === "completed" ? "PAID" : "PENDING"
                }</span>
              </div>
              ${
                checkout.paymentDetails?.paidAt
                  ? `
              <div class="detail-row">
                <span class="detail-label">Paid On:</span>
                <span class="detail-value">${new Date(
                  checkout.paymentDetails.paidAt
                ).toLocaleDateString()}</span>
              </div>
              `
                  : ""
              }
            </div>
          </div>
          
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              ${
                items
                  .map(
                    (item) => `
                <tr>
                  <td class="item-name">${item.product?.name || "Product"}</td>
                  <td>${item.quantity}</td>
                  <td>₦${formatPrice(item.product?.price || 0)}</td>
                  <td>₦${formatPrice(
                    (item.product?.price || 0) * item.quantity
                  )}</td>
                </tr>
              `
                  )
                  .join("") || '<tr><td colspan="4">No items</td></tr>'
              }
            </tbody>
          </table>
          
          <div class="totals-section">
            <div class="totals-table">
              <div class="total-row subtotal">
                <span>Subtotal:</span>
                <span>₦${formatPrice(subtotal)}</span>
              </div>
              <div class="total-row tax">
                <span>Tax (7.5%):</span>
                <span>₦${formatPrice(tax)}</span>
              </div>
              <div class="total-row shipping">
                <span>Shipping:</span>
                <span>₦0.00</span>
              </div>
              <div class="total-row grand-total">
                <span>TOTAL:</span>
                <span>₦${formatPrice(total)}</span>
              </div>
            </div>
          </div>
          
          ${
            checkout.shippingAddress
              ? `
          <div class="shipping-info">
            <h3>Shipping Address</h3>
            <div class="shipping-address">${checkout.shippingAddress}</div>
          </div>
          `
              : ""
          }
          
          <div class="invoice-footer">
            <div>Thank you for your business!</div>
            <div class="footer-note">
              For any questions regarding this invoice, please contact us at support@yourstore.com
            </div>
          </div>
        </div>
        
        <script>
          // Auto-print on load
          window.onload = () => {
            setTimeout(() => {
              window.print();
            }, 250);
          };
          
          // Optionally close after printing
          window.onafterprint = () => {
            // Uncomment the line below to auto-close after printing
            // window.close();
          };
        </script>
      </body>
    </html>
  `;

  invoiceWindow.document.write(invoiceHTML);
  invoiceWindow.document.close();
};
