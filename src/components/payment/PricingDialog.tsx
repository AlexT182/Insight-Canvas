
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Crown, Pencil, Save, X } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppConfig } from "@/hooks/useAppConfig";
import { Input } from "@/components/ui/input";

interface PricingDialogProps {
    trigger?: React.ReactNode;
}

export function PricingDialog({ trigger }: PricingDialogProps) {
    const { t } = useTranslation();
    const { initiateCheckout, isPro, isAdmin } = useSubscription();
    const { config, updateConfig, loading: configLoading } = useAppConfig();
    const [loading, setLoading] = useState(false);

    // Admin Edit State
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [editPriceValue, setEditPriceValue] = useState("");

    const proPrice = config["pro_monthly_price"] || "4.9";

    useEffect(() => {
        setEditPriceValue(proPrice);
    }, [proPrice]);

    const handleUpgrade = async () => {
        setLoading(true);
        // Replace with your actual Lemon Squeezy Checkout URL
        // In a real app, you might want to fetch this from config too if it changes
        await initiateCheckout("https://insidecanvas.lemonsqueezy.com/checkout/buy/03102370-1317-4581-807d-53696773322d");
        setLoading(false);
    };

    const handleSavePrice = async () => {
        await updateConfig("pro_monthly_price", editPriceValue);
        setIsEditingPrice(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="default" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0">
                        <Crown className="w-4 h-4 mr-2" />
                        {t('header.upgradeToPro')}
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Free Tier */}
                    <div className="p-6 flex flex-col h-full border-r border-border">
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold">{t('pricing.freeStarter')}</h3>
                            <p className="text-sm text-muted-foreground">{t('pricing.freeDesc')}</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold">$0</span>
                            <span className="text-muted-foreground">{t('pricing.month')}</span>
                        </div>
                        <ul className="space-y-3 flex-1 mb-6">
                            <li className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                <span>{t('pricing.basicTemplates')}</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                <span>{t('pricing.exportPng')}</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-green-500 mt-0.5" />
                                <span>{t('pricing.savedDesignsCount')}</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full mt-auto" disabled>
                            {t('pricing.currentPlan')}
                        </Button>
                    </div>

                    {/* Pro Tier */}
                    <div className="p-6 flex flex-col h-full bg-primary/5">
                        <div className="mb-4">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-semibold text-primary">{t('pricing.proCreator')}</h3>
                                <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">{t('pricing.popular')}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{t('pricing.proDesc')}</p>
                        </div>

                        <div className="mb-6 flex items-center gap-2">
                            {isEditingPrice ? (
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl font-bold">$</span>
                                    <Input
                                        value={editPriceValue}
                                        onChange={(e) => setEditPriceValue(e.target.value)}
                                        className="w-24 h-10 text-xl font-bold"
                                        autoFocus
                                    />
                                    <Button size="icon" variant="ghost" onClick={handleSavePrice}>
                                        <Save className="w-4 h-4 text-green-600" />
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => setIsEditingPrice(false)}>
                                        <X className="w-4 h-4 text-red-500" />
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    <span className="text-3xl font-bold">${proPrice}</span>
                                    <span className="text-muted-foreground">{t('pricing.month')}</span>
                                    {isAdmin && (
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-6 w-6 ml-2 opacity-50 hover:opacity-100"
                                            onClick={() => setIsEditingPrice(true)}
                                            title="Edit Price (Admin)"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>

                        <ul className="space-y-3 flex-1 mb-6">
                            <li className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>{t('pricing.allTemplates')}</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>{t('pricing.exportPdfHighRes')}</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>{t('pricing.unlimitedSavedDesigns')}</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>{t('pricing.brandKit')}</span>
                            </li>
                        </ul>

                        {isAdmin ? (
                            <Button
                                className="w-full mt-auto bg-primary hover:bg-primary/90"
                                disabled
                            >
                                <Crown className="w-4 h-4 mr-2" />
                                Admin Access (Unlimited)
                            </Button>
                        ) : (
                            <Button
                                className="w-full mt-auto bg-primary hover:bg-primary/90"
                                onClick={handleUpgrade}
                                disabled={isPro || loading}
                            >
                                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {isPro ? t('pricing.planActive') : t('pricing.upgradeNow')}
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
