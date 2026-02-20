import CopyButton from '../../shared/CopyButton'
import useColorConverter from './useColorConverter'

export default function ColorConverter() {
  const { hex, rgb, hsl, updateFromHex, updateFromRgb, updateFromHsl, formats } = useColorConverter()

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div>
        <h1 className="text-xl font-bold text-surface-900 dark:text-white">Color Converter</h1>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          Convert between HEX, RGB, and HSL color formats with live preview.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Preview */}
        <div className="flex flex-col items-center gap-3 rounded-lg border border-surface-200 bg-white p-6 dark:border-surface-700 dark:bg-surface-900">
          <div
            className="h-32 w-full rounded-lg border border-surface-200 dark:border-surface-600"
            style={{ backgroundColor: hex }}
          />
          <input
            type="color"
            value={hex.length === 7 ? hex : '#000000'}
            onChange={(e) => updateFromHex(e.target.value)}
            className="h-10 w-20 cursor-pointer rounded border-0"
          />
        </div>

        {/* Formats */}
        <div className="flex flex-col gap-3">
          {/* HEX */}
          <div className="rounded-lg border border-surface-200 bg-white p-3 dark:border-surface-700 dark:bg-surface-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">HEX</span>
              <CopyButton text={formats.hex} />
            </div>
            <input
              type="text"
              value={hex}
              onChange={(e) => updateFromHex(e.target.value)}
              className="w-full rounded border border-surface-200 bg-surface-50 px-3 py-1.5 font-mono text-sm text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
            />
          </div>

          {/* RGB */}
          <div className="rounded-lg border border-surface-200 bg-white p-3 dark:border-surface-700 dark:bg-surface-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-green-600 dark:text-green-400">RGB</span>
              <CopyButton text={formats.rgb} />
            </div>
            <div className="flex gap-2">
              {['r', 'g', 'b'].map((c) => (
                <div key={c} className="flex-1">
                  <label className="text-[10px] font-semibold uppercase text-surface-400">{c}</label>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    value={rgb[c]}
                    onChange={(e) => updateFromRgb(c, e.target.value)}
                    className="w-full rounded border border-surface-200 bg-surface-50 px-2 py-1.5 font-mono text-sm text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* HSL */}
          <div className="rounded-lg border border-surface-200 bg-white p-3 dark:border-surface-700 dark:bg-surface-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400">HSL</span>
              <CopyButton text={formats.hsl} />
            </div>
            <div className="flex gap-2">
              {[
                { key: 'h', label: 'H', max: 360 },
                { key: 's', label: 'S', max: 100 },
                { key: 'l', label: 'L', max: 100 },
              ].map(({ key, label, max }) => (
                <div key={key} className="flex-1">
                  <label className="text-[10px] font-semibold uppercase text-surface-400">
                    {label}{key !== 'h' ? '%' : '°'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={max}
                    value={hsl[key]}
                    onChange={(e) => updateFromHsl(key, e.target.value)}
                    className="w-full rounded border border-surface-200 bg-surface-50 px-2 py-1.5 font-mono text-sm text-surface-800 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
