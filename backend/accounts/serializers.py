from django.contrib.auth import get_user_model, password_validation
from rest_framework import serializers

User = get_user_model()


class SignupSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        email = value.strip().lower()
        if (
            User.objects.filter(email__iexact=email).exists()
            or User.objects.filter(username__iexact=email).exists()
        ):
            raise serializers.ValidationError(
                "An account with this email already exists."
            )
        return email

    def validate_password(self, value):
        # Django ke built-in rules: kam se kam 8 characters, sirf numbers nahi,
        # aur common password (jaise 12345678) nahi.
        password_validation.validate_password(value)
        return value

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["email"],  # email hi username hai
            email=validated_data["email"],
            password=validated_data["password"],
            first_name=validated_data["name"].strip(),
        )


class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()  # email ya username
    password = serializers.CharField(write_only=True)


class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="first_name")

    class Meta:
        model = User
        fields = ("id", "name", "email")