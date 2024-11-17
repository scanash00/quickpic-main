"use client";

import { useState, useRef, type ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  Download,
  Type,
  Image as ImageIcon,
  Move,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function WatermarkTool() {
  const [image, setImage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkImage, setWatermarkImage] = useState<string | null>(null);
  const [opacity, setOpacity] = useState(50);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#ffffff");
  const [isTextMode, setIsTextMode] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWatermarkImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setWatermarkImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const applyWatermark = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.globalAlpha = opacity / 100;

      if (isTextMode && watermarkText) {
        ctx.font = `${fontSize}px 'Geist Sans'`;
        ctx.fillStyle = color;
        const x = (img.width * position.x) / 100;
        const y = (img.height * position.y) / 100;
        ctx.fillText(watermarkText, x, y);
      } else if (!isTextMode && watermarkImage) {
        const watermark = new Image();
        watermark.onload = () => {
          const x = (img.width * position.x) / 100;
          const y = (img.height * position.y) / 100;
          const maxWidth = img.width * 0.5;
          const maxHeight = img.height * 0.5;
          const scale = Math.min(
            maxWidth / watermark.width,
            maxHeight / watermark.height,
          );
          const width = watermark.width * scale;
          const height = watermark.height * scale;
          ctx.drawImage(
            watermark,
            x - width / 2,
            y - height / 2,
            width,
            height,
          );
        };
        watermark.src = watermarkImage;
      }
    };
    img.src = image;
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "watermarked-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="w-full max-w-4xl space-y-8 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10 p-8 backdrop-blur-xl">
      <div className="flex flex-col items-center gap-6">
        <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-3xl font-bold text-transparent">
          Image Watermark Tool
        </h1>

        <div className="grid w-full gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl bg-white/5 p-6">
            <Label className="text-lg font-medium text-gray-200">
              Upload Image
            </Label>
            <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50">
              <label className="cursor-pointer">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div className="flex flex-col items-center gap-2 p-4">
                  <UploadCloud className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    Click to upload image
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-4 rounded-xl bg-white/5 p-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium text-gray-200">
                Watermark Type
              </Label>
              <div className="flex gap-2">
                <Button
                  variant={isTextMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsTextMode(true)}
                >
                  <Type className="mr-1 h-4 w-4" />
                  Text
                </Button>
                <Button
                  variant={!isTextMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsTextMode(false)}
                >
                  <ImageIcon className="mr-1 h-4 w-4" />
                  Image
                </Button>
              </div>
            </div>

            {isTextMode ? (
              <div className="space-y-4">
                <Input
                  placeholder="Enter watermark text"
                  value={watermarkText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setWatermarkText(e.target.value)
                  }
                  className="bg-gray-800/50"
                />
                <div className="space-y-2">
                  <Label>Font Size: {fontSize}px</Label>
                  <Slider
                    value={[fontSize]}
                    onValueChange={(values: number[]) => {
                      if (values[0] !== undefined) {
                        setFontSize(values[0]);
                      }
                    }}
                    min={12}
                    max={72}
                    step={1}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label>Color:</Label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setColor(e.target.value)
                    }
                    className="h-8 w-8 cursor-pointer rounded-lg border-0"
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleWatermarkImageUpload}
                  />
                  <div className="flex flex-col items-center gap-2 p-4">
                    <UploadCloud className="h-8 w-8 text-gray-400" />
                    <span className="text-sm text-gray-400">
                      Upload watermark image
                    </span>
                  </div>
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="w-full space-y-4 rounded-xl bg-white/5 p-6">
          <div className="flex items-center gap-2">
            <Move className="h-5 w-5 text-gray-400" />
            <Label className="text-lg font-medium text-gray-200">
              Position
            </Label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Horizontal: {position.x}%</Label>
              <Slider
                value={[position.x]}
                onValueChange={(values: number[]) => {
                  if (values[0] !== undefined) {
                    setPosition({ ...position, x: values[0] });
                  }
                }}
                min={0}
                max={100}
                step={1}
              />
            </div>
            <div className="space-y-2">
              <Label>Vertical: {position.y}%</Label>
              <Slider
                value={[position.y]}
                onValueChange={(values: number[]) => {
                  if (values[0] !== undefined) {
                    setPosition({ ...position, y: values[0] });
                  }
                }}
                min={0}
                max={100}
                step={1}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Opacity: {opacity}%</Label>
            <Slider
              value={[opacity]}
              onValueChange={(values: number[]) => {
                if (values[0] !== undefined) {
                  setOpacity(values[0]);
                }
              }}
              min={0}
              max={100}
              step={1}
            />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            size="lg"
            onClick={applyWatermark}
            className={cn(
              "bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all hover:from-purple-600 hover:to-pink-600",
              (!image || (!watermarkText && !watermarkImage)) && "opacity-50",
            )}
            disabled={!image || (!watermarkText && !watermarkImage)}
          >
            Apply Watermark
          </Button>
          <Button
            size="lg"
            onClick={downloadImage}
            variant="outline"
            className="border-gray-600 bg-gray-800/50 text-gray-200 hover:bg-gray-700/50"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-800/50">
          {image ? (
            <canvas ref={canvasRef} className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-gray-400">Preview will appear here</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
