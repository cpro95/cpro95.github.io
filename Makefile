# Makefile for Hugo

# 기본 설정
HUGO = hugo
PUBLIC_DIR = public
DEPLOY_SCRIPT = deploy.sh  # 필요에 따라 실제 배포 스크립트로 변경

# 도움말
help:
	@echo "Available targets:"
	@echo "  build     - 정적 사이트 빌드 (hugo)"
	@echo "  dev       - 개발 서버 실행 (hugo server)"
	@echo "  deploy    - 배포 (예: GitHub Pages 등)"
	@echo "  clean     - public 디렉토리 삭제"
	@echo "  help      - 이 도움말 표시"

# 1. 빌드 (Build)
build:
	$(HUGO)

# 2. 개발 서버 (Dev Server)
dev:
	$(HUGO) server

# 3. 배포 (Deploy)
deploy:
	@echo "배포 스크립트 실행..."
	@bash $(DEPLOY_SCRIPT)

# 4. 정리 (Clean)
clean:
	@echo "public 디렉토리 삭제 중..."
	@rm -rf $(PUBLIC_DIR)

# 기본 타겟 (build 실행)
all: build