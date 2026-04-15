using Microsoft.AspNetCore.Mvc;
using admission_form.Models;
using admission_form.Data;

namespace admission_form.Controllers;

public class AdmissionController : Controller
{
    private readonly AppDbContext _context;

    // Allowed MIME types and max file size (5 MB)
    private static readonly string[] AllowedTypes = { "image/jpeg", "image/png" };
    private const long MaxFileSizeBytes = 5 * 1024 * 1024; // 5 MB

    public AdmissionController(AppDbContext context)
    {
        _context = context;
    }

    // GET: /Admission/ - Show the form
    public IActionResult Index()
    {
        return View();
    }

    // POST: /Admission/Submit - Save to DB
    [HttpPost]
    public async Task<IActionResult> Submit(AdmissionModel model, IFormFile? profileImage)
    {
        // Validate image if provided
        if (profileImage != null)
        {
            if (!AllowedTypes.Contains(profileImage.ContentType))
                ModelState.AddModelError("profileImage", "Only JPG and PNG images are allowed.");
            else if (profileImage.Length > MaxFileSizeBytes)
                ModelState.AddModelError("profileImage", "Image must be smaller than 5 MB.");
        }

        if (ModelState.IsValid)
        {
            if (profileImage != null && profileImage.Length > 0)
            {
                using var ms = new MemoryStream();
                await profileImage.CopyToAsync(ms);
                model.ProfileImage = ms.ToArray();
                model.ImageContentType = profileImage.ContentType;
            }

            _context.Admissions.Add(model);
            _context.SaveChanges();
            return View("Success");
        }

        return View("Index", model);
    }

    // GET: /Admission/List - View all submissions
    public IActionResult List()
    {
        var admissions = _context.Admissions.ToList();
        return View(admissions);
    }

    // GET: /Admission/GetImage/1 - Serve stored image
    public IActionResult GetImage(int id)
    {
        var admission = _context.Admissions.Find(id);
        if (admission == null || admission.ProfileImage == null)
            return NotFound();
        return File(admission.ProfileImage, admission.ImageContentType!);
    }

    // GET: /Admission/IdCard/1 - Render printable ID card
    public IActionResult IdCard(int id)
    {
        var admission = _context.Admissions.Find(id);
        if (admission == null) return NotFound();
        return View(admission);
    }

    // GET: /Admission/Edit/1 - Show edit form
    public IActionResult Edit(int id)
    {
        var admission = _context.Admissions.Find(id);
        if (admission == null) return NotFound();
        return View(admission);
    }

    // POST: /Admission/Edit/1 - Save changes
    [HttpPost]
    public async Task<IActionResult> Edit(int id, AdmissionModel updated, IFormFile? profileImage)
    {
        var admission = _context.Admissions.Find(id);
        if (admission == null) return NotFound();

        // Validate image if a new one was uploaded
        if (profileImage != null)
        {
            if (!AllowedTypes.Contains(profileImage.ContentType))
                ModelState.AddModelError("profileImage", "Only JPG and PNG images are allowed.");
            else if (profileImage.Length > MaxFileSizeBytes)
                ModelState.AddModelError("profileImage", "Image must be smaller than 5 MB.");
        }

        if (ModelState.IsValid)
        {
            admission.Name = updated.Name;
            admission.Age = updated.Age;
            admission.Email = updated.Email;
            admission.PhoneNumber = updated.PhoneNumber;

            // Only replace the image if a new file was uploaded
            if (profileImage != null && profileImage.Length > 0)
            {
                using var ms = new MemoryStream();
                await profileImage.CopyToAsync(ms);
                admission.ProfileImage = ms.ToArray();
                admission.ImageContentType = profileImage.ContentType;
            }

            _context.SaveChanges();
            return RedirectToAction(nameof(List));
        }
        return View(updated);
    }

    // GET: /Admission/Delete/1 - Show delete confirmation
    public IActionResult Delete(int id)
    {
        var admission = _context.Admissions.Find(id);
        if (admission == null) return NotFound();
        return View(admission);
    }

    // POST: /Admission/Delete/1 - Confirm and delete
    [HttpPost, ActionName("Delete")]
    public IActionResult DeleteConfirmed(int id)
    {
        var admission = _context.Admissions.Find(id);
        if (admission != null)
        {
            _context.Admissions.Remove(admission);
            _context.SaveChanges();
        }
        return RedirectToAction(nameof(List));
    }
}