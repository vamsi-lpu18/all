using System.ComponentModel.DataAnnotations;

namespace admission_form.Models
{
    public class AdmissionModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string? Name { get; set; }

        [Range(1, 120)]
        public int? Age { get; set; }

        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [Required]
        [StringLength(10)]
        public string? PhoneNumber { get; set; }

        // Stores the raw image bytes in the database
        public byte[]? ProfileImage { get; set; }

        // Stores "image/jpeg" or "image/png"
        [StringLength(20)]
        public string? ImageContentType { get; set; }
    }
}