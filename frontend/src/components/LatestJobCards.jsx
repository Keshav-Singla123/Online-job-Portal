import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MapPin, DollarSign, Briefcase, Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const isApplied = user
    ? job?.applications?.some(
        (application) => application.applicant === user?._id,
      )
    : false;

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  const formatSalary = (salary) => {
    return (salary / 100000).toFixed(0);
  };

  return (
    <div className="p-5 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Header with date and bookmark */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-3 mb-3">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h2 className="font-bold text-base">{job?.company?.name}</h2>
          <p className="text-xs text-gray-600">
            {job?.company?.location || "India"}
          </p>
        </div>
      </div>

      {/* Job Title and Description */}
      <div className="mb-3">
        <h1 className="font-bold text-lg text-gray-800 mb-2">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>

      {/* Job Details Section */}
      <div className="bg-gray-50 p-3 rounded-md mb-3 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-blue-600" />
          <span className="text-gray-700">{job?.location || "India"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Briefcase size={16} className="text-green-600" />
          <span className="text-gray-700">{job?.jobType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <DollarSign size={16} className="text-purple-600" />
          <span className="text-gray-700 font-semibold">
            {formatSalary(job?.salary)} LPA
          </span>
        </div>
        {job?.experienceLevel && (
          <div className="flex items-center gap-2 text-sm">
            <Briefcase size={16} className="text-orange-600" />
            <span className="text-gray-700">
              {job?.experienceLevel} years experience
            </span>
          </div>
        )}
      </div>

      {/* Requirements Preview */}
      {job?.requirements && job?.requirements.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-700 mb-1">
            Skills Required:
          </p>
          <div className="flex flex-wrap gap-1">
            {job?.requirements.slice(0, 3).map((req, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {job?.requirements.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{job?.requirements.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 mb-4">
        <Badge className="bg-blue-100 text-blue-700 font-semibold">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-orange-100 text-orange-700 font-semibold">
          {job?.jobType}
        </Badge>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
        >
          View Details
        </Button>
        <Button
          disabled={isApplied}
          className={`${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default LatestJobCards;
