import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDeleteAccount } from "../hooks";

export function AccountDeletion() {
  const { t } = useTranslation();
  const [confirmationText, setConfirmationText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  const handleDeleteAccount = () => {
    deleteAccount();
    setIsDialogOpen(false);
  };

  const isConfirmationValid = confirmationText === "DELETE";

  return (
    <Card className="border-red-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-red-700">
          <AlertTriangle className="h-5 w-5" />
          <span>{t("settings.account.dangerZone", "Danger Zone")}</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h4 className="font-medium text-red-900 mb-2">
            {t("settings.account.deleteAccount", "Delete Account")}
          </h4>
          <p className="text-sm text-red-700 mb-4">
            {t("settings.account.deleteAccountWarning", "Once you delete your account, there is no going back. This action cannot be undone.")}
          </p>
          
          <div className="space-y-3">
            <h5 className="font-medium text-red-900">
              {t("settings.account.whatWillBeDeleted", "What will be deleted:")}
            </h5>
            <ul className="text-sm text-red-700 space-y-1 ml-4">
              <li>• {t("settings.account.deleteItem1", "Your profile and personal information")}</li>
              <li>• {t("settings.account.deleteItem2", "All job applications and their history")}</li>
              <li>• {t("settings.account.deleteItem3", "Saved jobs and preferences")}</li>
              <li>• {t("settings.account.deleteItem4", "Uploaded resumes and documents")}</li>
              <li>• {t("settings.account.deleteItem5", "Message history with recruiters")}</li>
            </ul>
          </div>
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="h-4 w-4 mr-2" />
              {t("settings.account.deleteMyAccount", "Delete My Account")}
            </Button>
          </AlertDialogTrigger>
          
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center space-x-2 text-red-700">
                <AlertTriangle className="h-5 w-5" />
                <span>{t("settings.account.confirmDeletion", "Confirm Account Deletion")}</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>
                  {t("settings.account.confirmDeletionDesc", "This action is permanent and cannot be undone. All your data will be permanently deleted from our servers.")}
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmation">
                    {t("settings.account.typeDelete", "Type 'DELETE' to confirm:")}
                  </Label>
                  <Input
                    id="confirmation"
                    value={confirmationText}
                    onChange={(e) => setConfirmationText(e.target.value)}
                    placeholder="DELETE"
                    className="font-mono"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmationText("")}>
                {t("common.cancel", "Cancel")}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={!isConfirmationValid || isPending}
                className="bg-red-600 hover:bg-red-700"
              >
                {isPending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  t("settings.account.deleteAccountPermanently", "Delete Account Permanently")
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Data Export Option */}
        <div className="pt-4 border-t">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              {t("settings.account.beforeYouGo", "Before You Go")}
            </h4>
            <p className="text-sm text-blue-700 mb-3">
              {t("settings.account.exportData", "You can export your data before deleting your account.")}
            </p>
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              {t("settings.account.exportMyData", "Export My Data")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
