import { cdmApi } from "../../../misc/cdmApi";
// VoucherManagement.jsx
import React, { useEffect, useState } from "react";
import { Trash2, Plus, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SideBarStaff from "../../../layouts/components/SideBarStaff";

// VoucherForm Component
const VoucherForm = ({ onClose, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.target);
    const data = {
      code: formData.get("code"),
      discount: Number(formData.get("percentage")),
      expirationDate: formData.get("expDate"),
      description: formData.get("description"),
      title: "",
    };

    // Validation
    if (!data.code || !data.description || !data.expirationDate || !data.discount) {
      setError("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    if (isNaN(data.discount) || data.discount <= 0 || data.discount > 100) {
      setError("Percentage must be between 0 and 100");
      setIsSubmitting(false);
      return;
    }

    try {
      await cdmApi.createVoucher(data);
      onSuccess?.();
    } catch (err) {
      setError("Failed to create voucher. Please try again.");
      console.error("Error creating voucher:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md m-4">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle>Create New Voucher</CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Voucher Code</Label>
              <Input
                id="code"
                name="code"
                placeholder="Enter voucher code"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="percentage">Discount Percentage</Label>
              <Input
                id="percentage"
                name="percentage"
                type="number"
                min="0"
                max="100"
                placeholder="Enter percentage (0-100)"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter voucher description"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expDate">Expiration Date</Label>
              <Input
                id="expDate"
                name="expDate"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Voucher"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

// StaffVoucher Component
const StaffVoucher = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const res = await cdmApi.getAllVoucher();
      setVouchers(res.data);
    } catch (err) {
      setError("Failed to fetch vouchers");
      console.error("Error fetching vouchers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVoucher = async (voucher) => {
    try {
      await cdmApi.deleteVoucher(voucher);
      showNotification("Voucher deleted successfully", "success");
      fetchVouchers();
    } catch (err) {
      showNotification("Failed to delete voucher", "error");
      console.error("Error deleting voucher:", err);
    }
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 6000);
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  return (
    <div className="flex h-screen dark:bg-gray-800">
      <SideBarStaff />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold dark:text-white">
            Voucher Management
          </h1>
          <Button
            onClick={() => setModalOpen(true)}
            className="dark:bg-blue-500 dark:hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Voucher
          </Button>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">No</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="w-24">Discount</TableHead>
                  <TableHead className="w-32">Expires</TableHead>
                  <TableHead className="w-16">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.map((voucher, index) => (
                  <TableRow key={voucher.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{voucher.code}</TableCell>
                    <TableCell>{voucher.description}</TableCell>
                    <TableCell>{voucher.discount}%</TableCell>
                    <TableCell>
                      {new Date(voucher.expirationDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteVoucher(voucher)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {vouchers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      No vouchers found. Create one to get started.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {notification && (
          <div className="fixed bottom-4 right-4 z-50">
            <Alert variant={notification.type === "error" ? "destructive" : "default"}>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {modalOpen && (
          <VoucherForm
            onClose={() => setModalOpen(false)}
            onSuccess={() => {
              setModalOpen(false);
              fetchVouchers();
              showNotification("Voucher created successfully");
            }}
          />
        )}
      </main>
    </div>
  );
};

export default StaffVoucher;