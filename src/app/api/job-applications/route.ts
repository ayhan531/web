import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const cv = formData.get('cv') as File;

    // Validate required fields
    if (!name || !email || !phone || !position) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate CV file
    if (cv) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(cv.type)) {
        return NextResponse.json(
          { error: 'CV must be PDF, DOC, or DOCX format' },
          { status: 400 }
        );
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (cv.size > maxSize) {
        return NextResponse.json(
          { error: 'CV file size must be less than 5MB' },
          { status: 400 }
        );
      }
    }

    // In production:
    // 1. Save CV file to cloud storage (AWS S3, Cloudflare R2, etc.)
    // 2. Save application to database with Prisma
    // 3. Send confirmation email to applicant
    // 4. Notify HR team via email
    
    // For now, just log and return success
    console.log('Job Application Received:', {
      name,
      email,
      phone,
      position,
      coverLetter: coverLetter ? `${coverLetter.substring(0, 50)}...` : 'None',
      cvFileName: cv?.name || 'No CV',
      cvSize: cv?.size || 0
    });

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const applicationId = `APP-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId,
      data: {
        name,
        email,
        position,
        submittedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error processing job application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
