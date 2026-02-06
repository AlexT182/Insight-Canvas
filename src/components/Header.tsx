
import { Layers, Moon, Sun, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { SavedDesignsPanel } from "./SavedDesignsPanel";
import { SavedDesign } from "@/hooks/useSavedDesigns";
import { InfographicData } from "@/types/infographic";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSubscription } from "@/hooks/useSubscription";
import { AuthDialog } from "@/components/auth/AuthDialog";
import { PricingDialog } from "@/components/payment/PricingDialog";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  currentData: InfographicData;
  designs: SavedDesign[];
  onSave: (name: string, data: InfographicData) => SavedDesign;
  onLoad: (data: InfographicData) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function Header({
  currentData,
  designs,
  onSave,
  onLoad,
  onRename,
  onDelete,
  onDuplicate,
}: HeaderProps) {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { isPro, isAdmin } = useSubscription();
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Layers className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-foreground">InfographicMaster</h1>
          <p className="text-xs text-muted-foreground">Design Studio</p>
        </div>
      </div>

      <nav className="flex items-center gap-2">
        <PricingDialog />
        <SavedDesignsPanel
          currentData={currentData}
          designs={designs}
          onSave={onSave}
          onLoad={onLoad}
          onRename={onRename}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
        />
        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email || ""} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {isAdmin ? "Admin" : isPro ? "Pro Plan" : "Free Plan"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate("/admin/users")}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Admin Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('header.account')}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Layout className="mr-2 h-4 w-4" />
                  <span>{t('header.savedDesigns')}</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="text-destructive focus:text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('header.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <AuthDialog />
        )}

        {/* Language Switcher */}
        <LanguageSwitcher />

        <div className="w-px h-6 bg-border mx-1 hidden sm:block" />
        <span className="text-xs text-muted-foreground hidden sm:block">
          {t('header.slogan')}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className="h-8 w-8 p-0"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </Button>
      </nav>
    </header>
  );
}
