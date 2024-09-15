import { AlertTriangle, Archive, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Archive className="h-12 w-12 text-yellow-500 mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">Project Retired</h1>
          </div>
          <div className="space-y-6 text-center">
            <p className="text-xl text-gray-600">This project has been retired and is no longer actively maintained.</p>
            <div className="flex items-center justify-center text-yellow-600 bg-yellow-100 py-2 px-4 rounded-md">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span>No further updates or support will be provided.</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">What does this mean?</h2>
              <ul className="text-gray-600 list-disc list-inside">
                <li>The project will remain available for reference</li>
                <li>No new features or bug fixes will be implemented</li>
                <li>Security vulnerabilities will not be addressed</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-gray-700">Recommended Actions</h2>
              <ul className="text-gray-600 list-disc list-inside">
                <li>Consider migrating to alternative solutions</li>
                <li>Archive any projects depending on this repository</li>
                <li>Reach out if you&apos;re interested in maintaining a fork</li>
              </ul>
            </div>
            <div className="pt-4">
              <Link
                href="https://github.com/KaramGuliyev/teachpdf"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                View Project Archive <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
          <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</p>
          <Link href="mailto:karamguliyev@juniustech.com" className="text-sm text-blue-600 hover:text-blue-800">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
