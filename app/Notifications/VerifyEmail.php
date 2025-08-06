<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail as BaseVerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Facades\Log;

class VerifyEmail extends BaseVerifyEmail
{
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        // Write verification link to a separate file to avoid encoding issues
        $logData = [
            'timestamp' => now()->toDateTimeString(),
            'user_id' => $notifiable->id,
            'email' => $notifiable->email,
            'verification_url' => $verificationUrl
        ];

        $logFile = storage_path('logs/verification_links.txt');
        $logEntry = json_encode($logData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n\n";
        file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);

        // Also try to log safely to Laravel log
        try {
            \Log::channel('single')->info('Verification email sent', [
                'user' => $notifiable->email,
                'url_length' => strlen($verificationUrl)
            ]);
        } catch (\Exception $e) {
            // Ignore logging errors
        }

        // Return a minimal mail message for development
        return (new MailMessage)
            ->subject('Email Verification Link')
            ->line('Your verification link has been saved to storage/logs/verification_links.txt')
            ->line('User: ' . $notifiable->email);
    }
}
