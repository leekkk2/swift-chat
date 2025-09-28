//
//  NovaSonicService.swift
//  SwiftChat
//
//  Created on 2025/4/10.
//

import Foundation

enum NovaSonicError: Error {
    case invalidCredentials
    case notSupported(String)
}

extension NovaSonicError: LocalizedError {
    var errorDescription: String? {
        switch self {
        case .invalidCredentials:
            return "Invalid credentials provided"
        case .notSupported(let message):
            return message
        }
    }
}

final class NovaSonicService {
    // Audio manager remains so existing UI hooks keep working
    public let audioManager = AudioManager()

    // Callbacks
    var onTranscriptReceived: ((String, String) -> Void)?
    var onAudioReceived: ((Data) -> Void)?
    var onError: ((Error) -> Void)?

    init(region _: String, accessKey _: String, secretKey _: String, sessionToken _: String? = nil, apiKey _: String? = nil) {
        setupAudioCallbacks()
    }

    private func setupAudioCallbacks() {
        // Forward audio manager errors to the consumer so the React Native layer can surface the issue.
        audioManager.onError = { [weak self] error in
            self?.onError?(error)
        }

        // Disable live capture handlers because the backend integration has been removed.
        audioManager.onAudioCaptured = nil
    }

    func updateCredentials(accessKey _: String, secretKey _: String, sessionToken _: String?, apiKey _: String?) {}

    private func unsupportedError() -> NovaSonicError {
        let message = "Nova Sonic streaming is no longer available because AWS SDK dependencies were removed."
        let error = NovaSonicError.notSupported(message)
        onError?(error)
        return error
    }

    func initializeClient() throws {
        throw unsupportedError()
    }

    func startSession(systemPrompt _: String, voiceId _: String, allowInterruption _: Bool) async throws {
        throw unsupportedError()
    }

    func sendAudioChunk(audioData _: Data) async throws {
        throw unsupportedError()
    }

    func endAudioInput() async throws {
        audioManager.stopCapturing()
    }

    func endSession() async throws {
        audioManager.stopCapturing()
        audioManager.stopPlayback()
        try? audioManager.deactivateAudioSession()
        setIsSessionActive(false)
    }

    func setIsSessionActive(_ isSessionActive: Bool) {
        audioManager.setIsActive(isSessionActive)
    }
}
