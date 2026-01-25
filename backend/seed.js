import mongoose from "mongoose";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import { User } from "./models/user.model.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

const seedData = async () => {
    try {
        // Delete all existing jobs and companies to start fresh
        await Job.deleteMany({});
        await Company.deleteMany({});
        console.log("Cleared existing jobs and companies");

        // Create an admin/recruiter user
        const hashedPassword = await bcrypt.hash("password123", 12);
        let recruiter = await User.findOne({ email: "recruiter@test.com" });
        
        if (!recruiter) {
            recruiter = await User.create({
                fullname: "John Recruiter",
                email: "recruiter@test.com",
                phoneNumber: "9876543210",
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    profilePhoto: "",
                }
            });
            console.log("Recruiter user created");
        }

        // Create sample companies
        const companies = [
            {
                name: "Google",
                description: "Google is a multinational technology company specializing in Internet-related services and products.",
                website: "https://www.google.com",
                location: "Bangalore, India",
                logo: "",
                userId: recruiter._id
            },
            {
                name: "Microsoft",
                description: "Microsoft is a technology corporation that develops, manufactures, licenses, supports and sells computer software.",
                website: "https://www.microsoft.com",
                location: "Hyderabad, India",
                logo: "",
                userId: recruiter._id
            },
            {
                name: "Amazon",
                description: "Amazon is an e-commerce and cloud computing company.",
                website: "https://www.amazon.com",
                location: "Mumbai, India",
                logo: "",
                userId: recruiter._id
            }
        ];

        const createdCompanies = [];
        for (const companyData of companies) {
            let company = await Company.findOne({ name: companyData.name });
            if (!company) {
                company = await Company.create(companyData);
                console.log(`Company created: ${company.name}`);
            }
            createdCompanies.push(company);
        }

        // Create sample jobs
        const jobsData = [
            {
                title: "Full Stack Developer",
                description: "We are looking for an experienced Full Stack Developer to join our team.",
                requirements: ["JavaScript", "React", "Node.js", "MongoDB"],
                salary: 1600000,
                location: "Bangalore, India",
                jobType: "Full-time",
                experienceLevel: 2,
                position: 5,
                company: createdCompanies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "Frontend Engineer",
                description: "Join our frontend team and build amazing user interfaces.",
                requirements: ["React", "TypeScript", "CSS", "HTML"],
                salary: 800000,
                location: "Delhi NCR, India",
                jobType: "Full-time",
                experienceLevel: 1,
                position: 3,
                company: createdCompanies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "Backend Developer",
                description: "Build robust and scalable backend systems.",
                requirements: ["Node.js", "Express", "MongoDB", "REST APIs"],
                salary: 1400000,
                location: "Hyderabad, India",
                jobType: "Full-time",
                experienceLevel: 2,
                position: 4,
                company: createdCompanies[1]._id,
                created_by: recruiter._id
            },
            {
                title: "React Developer",
                description: "Develop interactive UI components using React.",
                requirements: ["React", "JavaScript", "Redux", "CSS"],
                salary: 900000,
                location: "Mumbai, India",
                jobType: "Full-time",
                experienceLevel: 1,
                position: 2,
                company: createdCompanies[2]._id,
                created_by: recruiter._id
            },
            {
                title: "MERN Stack Developer",
                description: "Work on full-stack web development using MERN stack.",
                requirements: ["MongoDB", "Express", "React", "Node.js"],
                salary: 2000000,
                location: "Pune, India",
                jobType: "Full-time",
                experienceLevel: 3,
                position: 6,
                company: createdCompanies[0]._id,
                created_by: recruiter._id
            }
        ];

        for (const jobData of jobsData) {
            const existingJob = await Job.findOne({ title: jobData.title, company: jobData.company });
            if (!existingJob) {
                await Job.create(jobData);
                console.log(`Job created: ${jobData.title}`);
            }
        }

        console.log("✅ Database seeding completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

connectDB().then(() => {
    seedData();
});
