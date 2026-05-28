/**
 * Anime Defenders HQ - Premium UX Script
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Download Button Scroll Trigger
    const heroBtn = document.getElementById('heroDownloadBtn');
    const stickyWrapper = document.getElementById('stickyBtnWrapper');

    if (heroBtn && stickyWrapper) {
        window.addEventListener('scroll', () => {
            const rect = heroBtn.getBoundingClientRect();
            
            // Slide in sticky button when hero action is out of view
            if (rect.bottom < 0) {
                stickyWrapper.classList.add('visible');
            } else {
                stickyWrapper.classList.remove('visible');
            }
        });
    }

    // 2. Interactive FAQ Accordion Controls
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            const isActive = item.classList.contains('active');

            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle active item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // 3. Dynamic Year binding
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 4. Interactive Niche Diagnostic Panel Logic
    const simRange = document.getElementById('simRange');
    const simRangeVal = document.getElementById('simRangeVal');
    const simAutoWood = document.getElementById('simAutoWood');
    const simESP = document.getElementById('simESP');
    
    const simFPS = document.getElementById('simFPS');
    const simLatency = document.getElementById('simLatency');
    const consoleOutput = document.getElementById('consoleOutput');

    function updateSimulator() {
        if (!simRange) return;
        const val = parseInt(simRange.value);
        
        let logsString = "";
        const simType = "defenders";
        
        if (simType === "forest") {
            simRangeVal.textContent = val + " studs";
            
            let timberRate = val * (simAutoWood.checked ? 2.5 : 0.5);
            simFPS.textContent = Math.round(timberRate) + " Logs/Hr";
            
            let espRate = simESP.checked ? 99.9 : 45.2;
            simLatency.textContent = espRate + "% Precision";
            
            logsString = JSON.stringify({
                "AutoChopTimberRange": val,
                "AutoFeedCampfires": simAutoWood.checked,
                "LostChildrenESP": simESP.checked,
                "AntiSpamTickRate": "150ms",
                "InjectStatus": "UNC_OK"
            }, null, 2);
        } else if (simType === "dusty") {
            simRangeVal.textContent = val + " MPH";
            
            let usageRate = simAutoWood.checked ? 0.0 : 15.4;
            simFPS.textContent = usageRate.toFixed(1) + " Gal/Hr";
            
            let temp = simESP.checked ? 42 : Math.round(val * 0.85);
            simLatency.textContent = temp + "°C (Stable)";
            
            logsString = JSON.stringify({
                "VehicleVelocityLock": val,
                "UnlimitedGasolineSupply": simAutoWood.checked,
                "RadiatorWaterTempLock": simESP.checked,
                "PartESPBoundBoxes": true,
                "InjectionHook": "UNC_OK"
            }, null, 2);
        } else if (simType === "adopt") {
            simRangeVal.textContent = val + " Seconds Delay";
            
            let bucksRate = (12 - val) * (simESP.checked ? 600 : 300);
            simFPS.textContent = Math.round(bucksRate) + " Bucks/Hr";
            
            simLatency.textContent = simAutoWood.checked ? "100% Secure" : "Manual Hatch";
            
            logsString = JSON.stringify({
                "PetTaskAutomationDelay": val,
                "AutoEggHatchingLoop": simAutoWood.checked,
                "DoubleCareFarmingActive": simESP.checked,
                "AntiIdleKeepAlive": true,
                "TransactionVerify": "UNC_OK"
            }, null, 2);
        } else if (simType === "astd") {
            simRangeVal.textContent = "Wave " + val + " Placement";
            
            let gemRate = (26 - val) * (simAutoWood.checked ? 75 : 30);
            simFPS.textContent = Math.round(gemRate) + " Gems/Hr";
            
            simLatency.textContent = simESP.checked ? "72% Less Usage" : "0% Saved";
            
            logsString = JSON.stringify({
                "PlacementWaveThreshold": val,
                "InstantWaveSkipToggle": simAutoWood.checked,
                "DisableGraphicsAntiLag": simESP.checked,
                "AutoUpgradeLanes": true,
                "PlacerSocket": "UNC_OK"
            }, null, 2);
        } else if (simType === "adventures") {
            simRangeVal.textContent = val + "x Speed Target";
            
            let gemRate = val * (simESP.checked ? 450 : 250);
            simFPS.textContent = Math.round(gemRate) + " Portal Gems/Hr";
            
            simLatency.textContent = simAutoWood.checked ? "Unique Priority" : "Random Summons";
            
            logsString = JSON.stringify({
                "RaidingSpeedTargetMultiplier": val,
                "TraitAutoRollToggle": simAutoWood.checked,
                "InfiniteRoomSkipActive": simESP.checked,
                "AntiAFKMacrosEnabled": true,
                "RunnerStatus": "UNC_OK"
            }, null, 2);
        } else if (simType === "defenders") {
            simRangeVal.textContent = "Top " + (105 - val) + "% Rarity Lock";
            
            simFPS.textContent = simAutoWood.checked ? "100% Grid Match" : "90% Alignment";
            simLatency.textContent = simESP.checked ? "Flawless Auto" : "Manual Upgrade";
            
            logsString = JSON.stringify({
                "SummonTraitStopPercentile": val,
                "SmartPlacementMapScan": simAutoWood.checked,
                "AutoUpgradeDefenseGrid": simESP.checked,
                "AntiReportShields": true,
                "HookStatus": "UNC_OK"
            }, null, 2);
        }

        consoleOutput.textContent = logsString;
    }

    if (simRange) {
        simRange.addEventListener('input', updateSimulator);
        simAutoWood.addEventListener('change', updateSimulator);
        if (simESP) simESP.addEventListener('change', updateSimulator);
        updateSimulator();
    }
});

// 5. Global Clipboard Copy function
window.copyCode = function(elementId, btn) {
    const codeBlock = document.getElementById(elementId);
    if (!codeBlock) return;
    
    const text = codeBlock.textContent || codeBlock.innerText;
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        btn.textContent = "Copied!";
        btn.style.background = "#ffffff";
        btn.style.color = "#000000";
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = "";
            btn.style.color = "";
        }, 2000);
    }).catch(err => {
        console.error("Clipboard copy failed: ", err);
    });
};
