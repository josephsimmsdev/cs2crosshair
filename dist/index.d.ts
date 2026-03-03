export interface CrosshairOptions {
    gap: number;
    outlineThickness: number;
    red: number;
    green: number;
    blue: number;
    alpha: number;
    dynamicSplitdist: number;
    recoil: boolean;
    fixedGap: number;
    color: number;
    drawOutline: boolean;
    dynamicSplitalphaInnermod: number;
    dynamicSplitalphaOutermod: number;
    dynamicMaxdistSplitRatio: number;
    thickness: number;
    style: number;
    dot: boolean;
    gapUseWeaponValue: boolean;
    useAlpha: boolean;
    t: boolean;
    size: number;
}
export declare class Crosshair {
    /** Command: `cl_crosshairgap` — [-12.8; 12.7] */
    gap: number;
    /** Command: `cl_crosshair_outlinethickness` — [0.0; 3.0] */
    outlineThickness: number;
    /** Command: `cl_crosshaircolor_r` — [0; 255]. Applies only if `color === 5`. */
    red: number;
    /** Command: `cl_crosshaircolor_g` — [0; 255]. Applies only if `color === 5`. */
    green: number;
    /** Command: `cl_crosshaircolor_b` — [0; 255]. Applies only if `color === 5`. */
    blue: number;
    /** Command: `cl_crosshairalpha` — [0; 255]. Applies only if `useAlpha === true`. */
    alpha: number;
    /** Command: `cl_crosshair_dynamic_splitdist` — [0; 127] */
    dynamicSplitdist: number;
    /** Command: `cl_crosshair_recoil` — Exclusive to CS2. */
    recoil: boolean;
    /** Command: `cl_fixedcrosshairgap` — [-12.8; 12.7] */
    fixedGap: number;
    /** Command: `cl_crosshaircolor` — [0; 5] */
    color: number;
    /** Command: `cl_crosshair_drawoutline` */
    drawOutline: boolean;
    /** Command: `cl_crosshair_dynamic_splitalpha_innermod` — [0.0; 1.0] */
    dynamicSplitalphaInnermod: number;
    /** Command: `cl_crosshair_dynamic_splitalpha_outermod` — [0.3; 1.0] */
    dynamicSplitalphaOutermod: number;
    /** Command: `cl_crosshair_dynamic_maxdist_splitratio` — [0.0; 1.0] */
    dynamicMaxdistSplitRatio: number;
    /** Command: `cl_crosshairthickness` — [0.0; 6.3] */
    thickness: number;
    /** Command: `cl_crosshairstyle` — [0; 5] */
    style: number;
    /** Command: `cl_crosshairdot` */
    dot: boolean;
    /** Command: `cl_crosshairgap_useweaponvalue` */
    gapUseWeaponValue: boolean;
    /** Command: `cl_crosshairusealpha` */
    useAlpha: boolean;
    /** Command: `cl_crosshair_t` */
    t: boolean;
    /** Command: `cl_crosshairsize` — [0.0; 819.1] */
    size: number;
    constructor(options: CrosshairOptions);
    /** List of commands to apply this crosshair in CS:GO. */
    get csgoCommands(): string[];
    /** List of commands to apply this crosshair in CS2. */
    get cs2Commands(): string[];
    /**
     * Translates a crosshair share code into a Crosshair object.
     *
     * @param code - A crosshair share code (e.g. `CSGO-ZEw8O-KGXNu-4TTUU-VyXbD-SBCtG`).
     * @returns A Crosshair object associated with this code.
     * @throws {Error} If the code is invalid.
     */
    static decode(code: string): Crosshair;
    private static sortBytes;
    /**
     * Translates this Crosshair object into a crosshair share code.
     *
     * @returns A crosshair share code.
     */
    encode(): string;
    private getBytes;
}
