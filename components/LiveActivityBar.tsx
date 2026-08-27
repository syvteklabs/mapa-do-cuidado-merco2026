"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { IconSuccess } from "./icons/Icons";
import { colors } from "@/lib/designTokens";

interface ActivityStats {
  total: number;
  municipios: number;
  temas: number;
}

interface LiveActivityBarProps {
  showNewNotification?: boolean;
  onNotificationClose?: () => void;
}

export default function LiveActivityBar({
  showNewNotification = false,
  onNotificationClose,
}: LiveActivityBarProps) {
  const [stats, setStats] = useState<ActivityStats>({
    total: 0,
    municipios: 0,
    temas: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [notificationHideTime, setNotificationHideTime] = useState<number | null>(showNewNotification ? null : null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prevNotificationRef = useRef(showNewNotification);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/contribuicoes", {
          signal: AbortSignal.timeout(5000),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setStats({
              total: data.data.total || 0,
              municipios: Object.keys(data.data.byMunicipio || {}).length,
              temas: Object.keys(data.data.byCategory || {}).length,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    if (!prevNotificationRef.current && showNewNotification) {
      setNotificationHideTime(null);
    }
    prevNotificationRef.current = showNewNotification;
  }, [showNewNotification]);

  useEffect(() => {
    if (!showNewNotification) {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
        notificationTimeoutRef.current = null;
      }
      return;
    }

    notificationTimeoutRef.current = setTimeout(() => {
      setNotificationHideTime(Date.now());
      onNotificationClose?.();
    }, 4000);

    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
        notificationTimeoutRef.current = null;
      }
    };
  }, [showNewNotification, onNotificationClose]);

  const showNotification = useMemo(() => showNewNotification && notificationHideTime === null, [showNewNotification, notificationHideTime]);

  return (
    <div className="space-y-4">
      {/* Notification Bar */}
      {showNotification && (
        <div className="animate-in slide-in-from-top-2 duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center gap-3">
              <IconSuccess size={20} color={colors.success[600]} className="flex-shrink-0" />
              <p className="text-sm font-medium text-emerald-800">
                Nova experiência adicionada ao mapa agora.
              </p>
              <button
                onClick={() => {
                  setNotificationHideTime(Date.now());
                  onNotificationClose?.();
                }}
                className="ml-auto text-emerald-600 hover:text-emerald-700 font-semibold"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Activity Bar */}
      <div className="bg-blue-50 border-y border-blue-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:gap-8">
            <h2 className="text-center font-bold text-gray-900 text-lg">
              O território está falando
            </h2>

            {!isLoading && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <div className="text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-bold text-indigo-700">
                    {stats.total}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {stats.total === 1
                      ? "experiência compartilhada"
                      : "experiências compartilhadas"}
                  </p>
                </div>

                <div className="hidden sm:block text-gray-300">·</div>

                <div className="text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-bold text-indigo-700">
                    {stats.municipios}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {stats.municipios === 1
                      ? "município com participação registrada"
                      : "municípios com participação registrada"}
                  </p>
                </div>

                <div className="hidden sm:block text-gray-300">·</div>

                <div className="text-center sm:text-left">
                  <span className="text-xl sm:text-2xl font-bold text-indigo-700">
                    {stats.temas}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {stats.temas === 1 ? "tema revelado" : "temas revelados"}
                  </p>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center gap-2">
                <div className="h-2 w-2 bg-indigo-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-gray-600">Carregando dados...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
