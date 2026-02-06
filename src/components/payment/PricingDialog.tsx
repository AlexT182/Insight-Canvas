
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PricingDialogProps {
    trigger?: React.ReactNode;
}

export function PricingDialog({ trigger }: PricingDialogProps) {
    const { t } = useTranslation();
    const { initiateCheckout, isPro } = useSubscription();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        // Replace with your actual Stripe Price ID
        await initiateCheckout("price_1234567890");
        setLoading(false);
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
                        <div className="mb-6">
                            <span className="text-3xl font-bold">$4.9</span>
                            <span className="text-muted-foreground">{t('pricing.month')}</span>
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
                        <Button
                            className="w-full mt-auto bg-primary hover:bg-primary/90"
                            onClick={handleUpgrade}
                            disabled={isPro || loading}
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {isPro ? t('pricing.planActive') : t('pricing.upgradeNow')}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
