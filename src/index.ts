const DICTIONARY = 'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefhijkmnopqrstuvwxyz23456789';
const DICTIONARY_LENGTH = DICTIONARY.length;
const CODE_PATTERN = new RegExp(`^CSGO(-[${DICTIONARY}]{5}){5}$`);

function signedByte(x: number): number {
  return (x ^ 0x80) - 0x80;
}

function validateBounds(name: string, value: number, lower: number, upper: number): void {
  if (value < lower || value > upper) {
    throw new RangeError(`'${name}' has to be in range [${lower}; ${upper}].`);
  }
}

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

export class Crosshair {
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

  constructor(options: CrosshairOptions) {
    validateBounds('gap', options.gap, -12.8, 12.7);
    validateBounds('outlineThickness', options.outlineThickness, 0, 3.0);
    validateBounds('red', options.red, 0, 255);
    validateBounds('green', options.green, 0, 255);
    validateBounds('blue', options.blue, 0, 255);
    validateBounds('alpha', options.alpha, 0, 255);
    validateBounds('dynamicSplitdist', options.dynamicSplitdist, 0, 127);
    validateBounds('fixedGap', options.fixedGap, -12.8, 12.7);
    validateBounds('color', options.color, 0, 5);
    validateBounds('dynamicSplitalphaInnermod', options.dynamicSplitalphaInnermod, 0, 1);
    validateBounds('dynamicSplitalphaOutermod', options.dynamicSplitalphaOutermod, 0.3, 1);
    validateBounds('dynamicMaxdistSplitRatio', options.dynamicMaxdistSplitRatio, 0, 1);
    validateBounds('thickness', options.thickness, 0, 6.3);
    validateBounds('style', options.style, 0, 5);
    validateBounds('size', options.size, 0, 819.1);

    this.gap = options.gap;
    this.outlineThickness = options.outlineThickness;
    this.red = options.red;
    this.green = options.green;
    this.blue = options.blue;
    this.alpha = options.alpha;
    this.dynamicSplitdist = options.dynamicSplitdist;
    this.recoil = Boolean(options.recoil);
    this.fixedGap = options.fixedGap;
    this.color = options.color;
    this.drawOutline = Boolean(options.drawOutline);
    this.dynamicSplitalphaInnermod = options.dynamicSplitalphaInnermod;
    this.dynamicSplitalphaOutermod = options.dynamicSplitalphaOutermod;
    this.dynamicMaxdistSplitRatio = options.dynamicMaxdistSplitRatio;
    this.thickness = options.thickness;
    this.style = options.style;
    this.dot = Boolean(options.dot);
    this.gapUseWeaponValue = Boolean(options.gapUseWeaponValue);
    this.useAlpha = Boolean(options.useAlpha);
    this.t = Boolean(options.t);
    this.size = options.size;
  }

  /** List of commands to apply this crosshair in CS:GO. */
  get csgoCommands(): string[] {
    return [
      `cl_crosshairgap ${this.gap}`,
      `cl_crosshair_outlinethickness ${this.outlineThickness}`,
      `cl_crosshaircolor_r ${this.red}`,
      `cl_crosshaircolor_g ${this.green}`,
      `cl_crosshaircolor_b ${this.blue}`,
      `cl_crosshairalpha ${this.alpha}`,
      `cl_crosshair_dynamic_splitdist ${this.dynamicSplitdist}`,
      `cl_fixedcrosshairgap ${this.fixedGap}`,
      `cl_crosshaircolor ${this.color}`,
      `cl_crosshair_drawoutline ${this.drawOutline ? 1 : 0}`,
      `cl_crosshair_dynamic_splitalpha_innermod ${this.dynamicSplitalphaInnermod}`,
      `cl_crosshair_dynamic_splitalpha_outermod ${this.dynamicSplitalphaOutermod}`,
      `cl_crosshair_dynamic_maxdist_splitratio ${this.dynamicMaxdistSplitRatio}`,
      `cl_crosshairthickness ${this.thickness}`,
      `cl_crosshairstyle ${this.style}`,
      `cl_crosshairdot ${this.dot ? 1 : 0}`,
      `cl_crosshairgap_useweaponvalue ${this.gapUseWeaponValue ? 1 : 0}`,
      `cl_crosshairusealpha ${this.useAlpha ? 1 : 0}`,
      `cl_crosshair_t ${this.t ? 1 : 0}`,
      `cl_crosshairsize ${this.size}`,
    ];
  }

  /** List of commands to apply this crosshair in CS2. */
  get cs2Commands(): string[] {
    return [
      `cl_crosshairgap ${this.gap}`,
      `cl_crosshair_outlinethickness ${this.outlineThickness}`,
      `cl_crosshaircolor_r ${this.red}`,
      `cl_crosshaircolor_g ${this.green}`,
      `cl_crosshaircolor_b ${this.blue}`,
      `cl_crosshairalpha ${this.alpha}`,
      `cl_crosshair_dynamic_splitdist ${this.dynamicSplitdist}`,
      `cl_crosshair_recoil ${this.recoil}`,
      `cl_fixedcrosshairgap ${this.fixedGap}`,
      `cl_crosshaircolor ${this.color}`,
      `cl_crosshair_drawoutline ${this.drawOutline}`,
      `cl_crosshair_dynamic_splitalpha_innermod ${this.dynamicSplitalphaInnermod}`,
      `cl_crosshair_dynamic_splitalpha_outermod ${this.dynamicSplitalphaOutermod}`,
      `cl_crosshair_dynamic_maxdist_splitratio ${this.dynamicMaxdistSplitRatio}`,
      `cl_crosshairthickness ${this.thickness}`,
      `cl_crosshairstyle ${this.style}`,
      `cl_crosshairdot ${this.dot}`,
      `cl_crosshairgap_useweaponvalue ${this.gapUseWeaponValue}`,
      `cl_crosshairusealpha ${this.useAlpha}`,
      `cl_crosshair_t ${this.t}`,
      `cl_crosshairsize ${this.size}`,
    ];
  }

  /**
   * Translates a crosshair share code into a Crosshair object.
   *
   * @param code - A crosshair share code (e.g. `CSGO-ZEw8O-KGXNu-4TTUU-VyXbD-SBCtG`).
   * @returns A Crosshair object associated with this code.
   * @throws {Error} If the code is invalid.
   */
  static decode(code: string): Crosshair {
    if (!CODE_PATTERN.test(code)) {
      throw new Error(`'${code}' doesn't match the pattern.`);
    }

    const chars = code.slice(5).replace(/-/g, '');

    let num = 0n;
    for (let i = chars.length - 1; i >= 0; i--) {
      num = num * BigInt(DICTIONARY_LENGTH) + BigInt(DICTIONARY.indexOf(chars[i]));
    }

    const hexnum = num.toString(16).padStart(36, '0');
    if (hexnum.length > 36) {
      throw new Error(`Invalid crosshair code: '${code}'.`);
    }

    const bytes = new Uint8Array(18);
    for (let i = 0; i < 18; i++) {
      bytes[i] = parseInt(hexnum.substring(i * 2, i * 2 + 2), 16);
    }

    let checksum = 0;
    for (let i = 1; i < bytes.length; i++) checksum += bytes[i];
    if (bytes[0] !== (checksum & 0xff)) {
      throw new Error(`Invalid crosshair code: '${code}'.`);
    }

    return new Crosshair(Crosshair.sortBytes(bytes));
  }

  private static sortBytes(bytes: Uint8Array): CrosshairOptions {
    return {
      gap: signedByte(bytes[2]) / 10,
      outlineThickness: bytes[3] / 2,
      red: bytes[4],
      green: bytes[5],
      blue: bytes[6],
      alpha: bytes[7],
      dynamicSplitdist: bytes[8] & 0x7f,
      recoil: ((bytes[8] >> 4) & 8) === 8,
      fixedGap: signedByte(bytes[9]) / 10,
      color: bytes[10] & 7,
      drawOutline: (bytes[10] & 8) === 8,
      dynamicSplitalphaInnermod: (bytes[10] >> 4) / 10,
      dynamicSplitalphaOutermod: (bytes[11] & 0xf) / 10,
      dynamicMaxdistSplitRatio: (bytes[11] >> 4) / 10,
      thickness: bytes[12] / 10,
      style: (bytes[13] & 0xf) >> 1,
      dot: ((bytes[13] >> 4) & 1) === 1,
      gapUseWeaponValue: ((bytes[13] >> 4) & 2) === 2,
      useAlpha: ((bytes[13] >> 4) & 4) === 4,
      t: ((bytes[13] >> 4) & 8) === 8,
      size: (((bytes[15] & 0x1f) << 8) + bytes[14]) / 10,
    };
  }

  /**
   * Translates this Crosshair object into a crosshair share code.
   *
   * @returns A crosshair share code.
   */
  encode(): string {
    const bytes = this.getBytes();

    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    let num = BigInt('0x' + hex);

    const dictLen = BigInt(DICTIONARY_LENGTH);
    let code = '';
    for (let i = 0; i < 25; i++) {
      code += DICTIONARY[Number(num % dictLen)];
      num = num / dictLen;
    }

    return `CSGO-${code.slice(0, 5)}-${code.slice(5, 10)}-${code.slice(10, 15)}-${code.slice(15, 20)}-${code.slice(20)}`;
  }

  private getBytes(): Uint8Array {
    const bytesArray = new Uint8Array([
      0,
      1,
      Math.trunc(this.gap * 10) & 0xff,
      Math.trunc(this.outlineThickness * 2),
      this.red,
      this.green,
      this.blue,
      this.alpha,
      this.dynamicSplitdist | ((this.recoil ? 1 : 0) << 7),
      Math.trunc(this.fixedGap * 10) & 0xff,
      (this.color & 7) |
        ((this.drawOutline ? 1 : 0) << 3) |
        (Math.trunc(this.dynamicSplitalphaInnermod * 10) << 4),
      Math.trunc(this.dynamicSplitalphaOutermod * 10) |
        (Math.trunc(this.dynamicMaxdistSplitRatio * 10) << 4),
      Math.trunc(this.thickness * 10),
      (this.style << 1) |
        ((this.dot ? 1 : 0) << 4) |
        ((this.gapUseWeaponValue ? 1 : 0) << 5) |
        ((this.useAlpha ? 1 : 0) << 6) |
        ((this.t ? 1 : 0) << 7),
      Math.trunc(this.size * 10) & 0xff,
      (Math.trunc(this.size * 10) >> 8) & 0x1f,
      0,
      0,
    ]);

    let sum = 0;
    for (let i = 1; i < bytesArray.length; i++) sum += bytesArray[i];
    bytesArray[0] = sum & 0xff;

    return bytesArray;
  }
}
