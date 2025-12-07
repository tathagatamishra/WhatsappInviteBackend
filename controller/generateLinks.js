exports.genRoutes = async (req, res) => {
  try {
    const { recipients, message, imageUrl } = req.body;
    if (!Array.isArray(recipients) || recipients.length === 0)
      return res.status(400).json({ error: "no recipients" });
    if (!message) return res.status(400).json({ error: "no message" });

    // Build links
    const links = recipients.map((num) => {
      // Replace placeholders if you want here (basic example: {{name}} not replaced because we only have number)
      let text = message;
      if (imageUrl) {
        // Put image link at the end — WhatsApp won't auto-attach a remote image via wa.me; but sending the URL lets recipients open it.
        text += `\n\n${imageUrl}`;
      }
      const encoded = encodeURIComponent(text);
      // Use wa.me with international number without + or spaces
      return `https://wa.me/${num}?text=${encoded}`;
    });

    return res.json({ links });
  } catch (error) {}
};
